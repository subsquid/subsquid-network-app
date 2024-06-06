import { useEffect, useMemo, useRef, useState } from 'react';

import { calculateDelegationCapacity } from '@lib/network';
import { logger } from '@logger';
import BigNumber from 'bignumber.js';
import { encodeFunctionData } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import {
  useWriteContract,
  usePublicClient,
  useClient,
  useReadContract,
  useReadContracts,
} from 'wagmi';

import { useApproveSqd } from '@api/contracts/sqd';
import { VESTING_CONTRACT_ABI } from '@api/contracts/vesting.abi';
import { AccountType, BlockchainApiWorker, SourceWallet } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { SOFT_CAP_ABI } from './soft-cap.abi';
import { STAKING_CONTRACT_ABI } from './staking.abi';
import { errorMessage, TxResult, isApproveRequiredError, WriteContractRes } from './utils';

type WorkerDepositRequest = {
  worker: BlockchainApiWorker;
  amount: string;
  wallet: Pick<SourceWallet, 'id' | 'type'>;
};

function useDelegateFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  const [approveSqd] = useApproveSqd();

  const tryCallContract = async ({ worker, amount }: WorkerDepositRequest) => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.STAKING,
          abi: STAKING_CONTRACT_ABI,
          functionName: 'deposit',
          args: [BigInt(worker.id), BigInt(amount)],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };

  return async (req: WorkerDepositRequest): Promise<TxResult> => {
    logger.debug(`deposit to worker via worker contract...`);

    const res = await tryCallContract(req);
    // Try to approve SQD
    if (isApproveRequiredError(res.error)) {
      const approveRes = await approveSqd({
        contractAddress: contracts.STAKING,
        amount: BigNumber(req.amount.toString()),
      });
      if (!approveRes.success) {
        return { error: approveRes.failedReason };
      }

      logger.debug(`approved SQD successfully, now trying to register one more time...`);

      return tryCallContract(req);
    }

    return res;
  };
}

function useDepositFromVestingContract() {
  const contracts = useContracts();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ worker, amount, wallet }: WorkerDepositRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: STAKING_CONTRACT_ABI,
        functionName: 'deposit',
        args: [BigInt(worker.id), BigInt(amount)],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: wallet.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.STAKING, data, BigInt(amount)],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useWorkerDelegate() {
  const client = useClient();
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const depositFromWallet = useDelegateFromWallet();
  const depositFromVestingContract = useDepositFromVestingContract();

  const delegateToWorker = async ({
    worker,
    amount,
    wallet,
  }: WorkerDepositRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const res =
      wallet.type === AccountType.User
        ? await depositFromWallet({ worker, amount, wallet })
        : await depositFromVestingContract({ worker, amount, wallet });

    if (!res.tx) {
      setLoading(false);
      setError(res.error);

      return { success: false, failedReason: res.error };
    }

    const receipt = await waitForTransactionReceipt(client!, { hash: res.tx });
    setWaitHeight(receipt.blockNumber, []);

    setLoading(false);

    return { success: true };
  };

  return {
    delegateToWorker,
    isLoading,
    error,
  };
}

function useUndelegateFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  return async ({ worker, amount }: WorkerDepositRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.STAKING,
          abi: STAKING_CONTRACT_ABI,
          functionName: 'withdraw',
          args: [BigInt(worker.id), BigInt(amount)],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useUndelegateFromVestingContract() {
  const contracts = useContracts();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ worker, amount, wallet }: WorkerDepositRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: STAKING_CONTRACT_ABI,
        functionName: 'withdraw',
        args: [BigInt(worker.id), BigInt(amount)],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: wallet.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.STAKING, data, BigInt(amount)],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useWorkerUndelegate() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const undelegateFromWallet = useUndelegateFromWallet();
  const undelegateFromVestingContract = useUndelegateFromVestingContract();

  const undelegateFromWorker = async ({
    worker,
    amount,
    wallet,
  }: WorkerDepositRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const res =
      wallet.type === AccountType.User
        ? await undelegateFromWallet({ worker, amount, wallet })
        : await undelegateFromVestingContract({ worker, amount, wallet });

    if (!res.tx) {
      setLoading(false);
      setError(res.error);

      return { success: false, failedReason: res.error };
    }

    const receipt = await waitForTransactionReceipt(client!, { hash: res.tx });
    setWaitHeight(receipt.blockNumber, []);

    setLoading(false);

    return { success: true };
  };

  return {
    undelegateFromWorker,
    isLoading,
    error,
  };
}

export function useCapedStake({ workerId }: { workerId?: string }) {
  const contracts = useContracts();
  const { currentHeight, isLoading: isHeightLoading } = useSquidNetworkHeightHooks();

  const { data, isLoading } = useReadContract({
    address: contracts.SOFT_CAP,
    abi: SOFT_CAP_ABI,
    functionName: 'capedStake',
    args: [BigInt(workerId || -1)],
    blockNumber: BigInt(currentHeight),
    query: {
      enabled: !!workerId && !isHeightLoading,
    },
  });

  const res = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!isLoading) res.current = data?.toString();
  }, [data, isLoading]);

  return {
    data: res.current,
    isLoading: !res.current,
  };
}

export function useCapedStakeAfterDelegation({
  workerId,
  amount,
  undelegate,
  enabled,
}: {
  workerId: string;
  amount: string;
  undelegate?: boolean;
  enabled?: boolean;
}) {
  const contracts = useContracts();

  const { data, isPending } = useReadContracts({
    contracts: [
      {
        address: contracts.SOFT_CAP,
        abi: SOFT_CAP_ABI,
        functionName: 'capedStakeAfterDelegation',
        args: [BigInt(workerId), BigInt(amount || 0n) * (undelegate ? -1n : 1n)],
      },
      {
        address: contracts.STAKING,
        abi: STAKING_CONTRACT_ABI,
        functionName: 'delegated',
        args: [BigInt(workerId)],
      },
    ],
    allowFailure: false,
    query: {
      enabled: !!workerId && enabled !== false,
      select: res => {
        return {
          capedDelegation: res[0].toString(),
          totalDelegation: res[1].toString(),
        };
      },
    },
  });

  const res = useMemo(() => {
    const capedDelegation = data?.capedDelegation || '0';

    let td = BigNumber(data?.totalDelegation || '0');
    if (undelegate) {
      td = td.minus(amount);
    } else {
      td = td.plus(amount);
    }
    const totalDelegation = td.lt(0) ? '0' : td.toFixed();

    const delegationCapacity = calculateDelegationCapacity({
      capedDelegation,
      totalDelegation,
    });

    return {
      capedDelegation,
      totalDelegation,
      delegationCapacity,
    };
  }, [amount, data?.capedDelegation, data?.totalDelegation, undelegate]);

  return {
    data: res,
    isPending: isPending,
  };
}
