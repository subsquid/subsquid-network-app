import { useState } from 'react';

import { peerIdToHex } from '@lib/network';
import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useWriteContract, usePublicClient, useClient } from 'wagmi';

import { useApproveSqd } from '@api/contracts/sqd';
import { VESTING_CONTRACT_ABI } from '@api/contracts/abi/vesting.abi';
import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { TxResult, errorMessage, isApproveRequiredError, WriteContractRes } from '../utils';

import { encodeWorkerMetadata, WorkerMetadata } from './WorkerMetadata';
import { WORKER_REGISTRATION_CONTRACT_ABI } from '../abi/WorkerRegistration.abi';

export interface AddWorkerRequest extends WorkerMetadata {
  peerId: string;
  source: SourceWallet;
}

function useRegisterFromWallet() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const [approveSqd] = useApproveSqd();

  const { writeContractAsync } = useWriteContract({});

  const tryCallRegistrationContract = async ({
    peerId,
    ...rest
  }: AddWorkerRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.WORKER_REGISTRATION,
          abi: WORKER_REGISTRATION_CONTRACT_ABI,
          functionName: 'register',
          args: [peerIdToHex(peerId), encodeWorkerMetadata(rest)],
        }),
      };
    } catch (e: unknown) {
      return {
        error: errorMessage(e),
      };
    }
  };

  return async (req: AddWorkerRequest): Promise<TxResult> => {
    logger.debug(`registering worker via worker contract...`);

    const res = await tryCallRegistrationContract(req);
    // Try to approve SQD
    if (isApproveRequiredError(res.error)) {
      const bond = await publicClient!.readContract({
        address: contracts.WORKER_REGISTRATION,
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'bondAmount',
      });

      const approveRes = await approveSqd({
        contractAddress: contracts.WORKER_REGISTRATION,
        amount: bond.toString(),
      });
      if (!approveRes.success) {
        return { error: approveRes.failedReason };
      }

      logger.debug(`approved SQD successfully, now trying to register one more time...`);

      return tryCallRegistrationContract(req);
    }

    return res;
  };
}

function useRegisterWorkerFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ peerId, source, ...rest }: AddWorkerRequest): Promise<TxResult> => {
    try {
      const bond = await publicClient!.readContract({
        address: contracts.WORKER_REGISTRATION,
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'bondAmount',
      });

      const data = encodeFunctionData({
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'register',
        args: [peerIdToHex(peerId), encodeWorkerMetadata(rest)],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: source.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.WORKER_REGISTRATION, data, bond],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useRegisterWorker() {
  const client = useClient();
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { setWaitHeight } = useSquidNetworkHeight();
  const registerWorkerContract = useRegisterFromWallet();
  const registerVestingContract = useRegisterWorkerFromVestingContract();

  const registerWorker = async (req: AddWorkerRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const { tx, error } =
      req.source.type === AccountType.Vesting
        ? await registerVestingContract(req)
        : await registerWorkerContract(req);

    if (!tx) {
      logger.debug(`registering worker failed ${error}`);
      setLoading(false);
      setError(error);
      return { success: false, failedReason: error };
    }

    const receipt = await waitForTransactionReceipt(client!, { hash: tx });
    setWaitHeight(receipt.blockNumber, ['myWorkers', { address }]);
    setLoading(false);
    setError(null);

    return { success: true };
  };

  return { registerWorker, isLoading, error };
}
