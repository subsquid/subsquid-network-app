import { useState } from 'react';

import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { VESTING_CONTRACT_ABI } from '@api/contracts/vesting.abi';
import { AccountType } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { errorMessage, peerIdToHex, TxResult, WriteContractRes } from '../utils';

import { WORKER_REGISTRATION_CONTRACT_ABI } from './WorkerRegistration.abi';

export interface UnregisterWorkerRequest {
  peerId: string;
  source: {
    id: string;
    type: AccountType;
  };
}

function useUnregisterWorkerFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.WORKER_REGISTRATION,
    abi: WORKER_REGISTRATION_CONTRACT_ABI,
    functionName: 'deregister',
  });

  return async ({ peerId }: { peerId: string }): Promise<TxResult> => {
    try {
      return {
        tx: await writeAsync({
          args: [peerIdToHex(peerId)],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useUnregisterWorkerFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ peerId, source }: UnregisterWorkerRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'deregister',
        args: [peerIdToHex(peerId)],
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

export function useUnregisterWorker() {
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [error, setError] = useState<string | null>(null);

  const unregisterWorkerFromWallet = useUnregisterWorkerFromWallet();
  const unregisterWorkerFromVestingContract = useUnregisterWorkerFromVestingContract();

  const unregisterWorker = async (req: UnregisterWorkerRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const { tx, error } =
      req.source.type === AccountType.User
        ? await unregisterWorkerFromWallet(req)
        : await unregisterWorkerFromVestingContract(req);

    if (!tx) {
      logger.debug(`update worker failed ${error}`);
      setLoading(false);
      setError(error);
      return { success: false, failedReason: error };
    }

    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx.hash });
    setWaitHeight(receipt.blockNumber, ['myWorkers', { address }]);
    setLoading(false);
    setError(null);

    return { success: true };
  };

  return {
    unregisterWorker,
    isLoading,
    error,
  };
}
