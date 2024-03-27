import { useState } from 'react';

import { logger } from '@logger';
import Decimal from 'decimal.js';
import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { useApproveSqd } from '@api/contracts/sqd';
import {
  errorMessage,
  isApproveRequiredError,
  TxResult,
  WriteContractRes,
} from '@api/contracts/utils';
import { VESTING_CONTRACT_ABI } from '@api/contracts/vesting.abi';
import { AccountType, BlockchainApiWorker, SourceWallet } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { STAKING_CONTRACT_ABI } from './staking.abi';

type WorkerDepositRequest = {
  worker: BlockchainApiWorker;
  amount: bigint;
  wallet: Pick<SourceWallet, 'id' | 'type'>;
};

function useDelegateFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.STAKING,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'deposit',
  });

  const [approveSqd] = useApproveSqd();

  const tryCallContract = async ({ worker, amount }: WorkerDepositRequest) => {
    try {
      return { tx: await writeAsync({ args: [BigInt(worker.id), amount] }) };
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
        amount: new Decimal(req.amount.toString()),
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
  const publicClient = usePublicClient();
  const contracts = useContracts();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ worker, amount, wallet }: WorkerDepositRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: STAKING_CONTRACT_ABI,
        functionName: 'deposit',
        args: [BigInt(worker.id), amount],
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: wallet.id as `0x${string}`,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'execute',
        args: [contracts.STAKING, data, amount],
      });

      const tx = await walletClient?.writeContract(request);
      if (!tx) {
        return { error: 'unknown error' };
      }

      return { tx: { hash: tx } };
    } catch (e: any) {
      return { error: errorMessage(e) };
    }
  };
}

export function useWorkerDelegate() {
  const client = usePublicClient();
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

    const receipt = await client.waitForTransactionReceipt({ hash: res.tx.hash });
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
  const { writeAsync } = useContractWrite({
    address: contracts.STAKING,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'withdraw',
  });

  return async ({ worker, amount }: WorkerDepositRequest): Promise<TxResult> => {
    try {
      return { tx: await writeAsync({ args: [BigInt(worker.id), amount] }) };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useUndelegateFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ worker, amount, wallet }: WorkerDepositRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: STAKING_CONTRACT_ABI,
        functionName: 'withdraw',
        args: [BigInt(worker.id), amount],
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: wallet.id as `0x${string}`,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'execute',
        args: [contracts.STAKING, data, amount],
      });

      const tx = await walletClient?.writeContract(request);
      if (!tx) {
        return { error: 'unknown error' };
      }

      return { tx: { hash: tx } };
    } catch (e: any) {
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

    const receipt = await client.waitForTransactionReceipt({ hash: res.tx.hash });
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
