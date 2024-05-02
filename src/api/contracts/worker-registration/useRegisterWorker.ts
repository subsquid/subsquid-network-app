import { useState } from 'react';

import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { useApproveSqd } from '@api/contracts/sqd';
import {
  errorMessage,
  isApproveRequiredError,
  peerIdToHex,
  TxResult,
  WriteContractRes,
} from '@api/contracts/utils';
import { VESTING_CONTRACT_ABI } from '@api/contracts/vesting.abi';
import { AccountType, SourceWallet, useNetworkSettings } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { encodeWorkerMetadata, WorkerMetadata } from './WorkerMetadata';
import { WORKER_REGISTRATION_CONTRACT_ABI } from './WorkerRegistration.abi';

export interface AddWorkerRequest extends WorkerMetadata {
  peerId: string;
  source: SourceWallet;
}

function useRegisterFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.WORKER_REGISTRATION,
    abi: WORKER_REGISTRATION_CONTRACT_ABI,
    functionName: 'register',
  });

  const [approveSqd] = useApproveSqd();
  const { bondAmount } = useNetworkSettings();
  const tryCallRegistrationContract = async ({
    peerId,
    ...rest
  }: AddWorkerRequest): Promise<TxResult> => {
    try {
      return { tx: await writeAsync({ args: [peerIdToHex(peerId), encodeWorkerMetadata(rest)] }) };
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
      const approveRes = await approveSqd({
        contractAddress: contracts.WORKER_REGISTRATION,
        amount: bondAmount,
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
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ peerId, source, ...rest }: AddWorkerRequest): Promise<TxResult> => {
    try {
      const bond = await publicClient.readContract({
        address: contracts.WORKER_REGISTRATION,
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'bondAmount',
      });

      const data = encodeFunctionData({
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'register',
        args: [peerIdToHex(peerId), encodeWorkerMetadata(rest)],
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: source.id as `0x${string}`,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'execute',
        args: [contracts.WORKER_REGISTRATION, data, bond],
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

export function useRegisterWorker() {
  const client = usePublicClient();
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { setWaitHeight } = useSquidNetworkHeightHooks();
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

    const receipt = await client.waitForTransactionReceipt({ hash: tx.hash });
    setWaitHeight(receipt.blockNumber, ['myWorkers', { address }]);
    setLoading(false);
    setError(null);

    return { success: true };
  };

  return { registerWorker, isLoading, error };
}
