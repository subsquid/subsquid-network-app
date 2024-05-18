import { useState } from 'react';

import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useWriteContract, useClient } from 'wagmi';

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
  const { writeContractAsync } = useWriteContract({});

  return async ({ peerId }: { peerId: string }): Promise<TxResult> => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.WORKER_REGISTRATION,
          abi: WORKER_REGISTRATION_CONTRACT_ABI,
          functionName: 'deregister',
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
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ peerId, source }: UnregisterWorkerRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: WORKER_REGISTRATION_CONTRACT_ABI,
        functionName: 'deregister',
        args: [peerIdToHex(peerId)],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: source.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.WORKER_REGISTRATION, data],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useUnregisterWorker() {
  const client = useClient();
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

    const receipt = await waitForTransactionReceipt(client!, { hash: tx });
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
