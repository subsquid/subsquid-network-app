import { useState } from 'react';

import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { AccountType } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { errorMessage, peerIdToHex, TxResult, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { encodeWorkerMetadata, WorkerMetadata } from './WorkerMetadata';
import { WORKER_REGISTRATION_CONTRACT_ABI } from './WorkerRegistration.abi';

export interface UpdateWorkerRequest extends WorkerMetadata {
  peerId: string;
  source: {
    id: string;
    type: AccountType;
  };
}

function useUpdateWorkerFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.WORKER_REGISTRATION,
    abi: WORKER_REGISTRATION_CONTRACT_ABI,
    functionName: 'updateMetadata',
  });

  return async ({ peerId, ...rest }: UpdateWorkerRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeAsync({
          args: [peerIdToHex(peerId), encodeWorkerMetadata(rest)],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useUpdateWorkerFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ peerId, source, ...rest }: UpdateWorkerRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'updateMetadata',
        args: [peerIdToHex(peerId), encodeWorkerMetadata(rest)],
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: source.id as `0x${string}`,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'execute',
        args: [contracts.WORKER_REGISTRATION, data],
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

export function useUpdateWorker() {
  const client = usePublicClient();
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const updateWorkerFromWallet = useUpdateWorkerFromWallet();
  const updateWorkerFromVestingContract = useUpdateWorkerFromVestingContract();

  const updateWorker = async (req: UpdateWorkerRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const { tx, error } =
      req.source.type === AccountType.User
        ? await updateWorkerFromWallet(req)
        : await updateWorkerFromVestingContract(req);

    if (!tx) {
      logger.debug(`update worker failed ${error}`);
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

  return { updateWorker, isLoading, error };
}
