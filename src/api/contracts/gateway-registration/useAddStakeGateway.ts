import { useState } from 'react';

import { logger } from '@logger';
import { usePublicClient, useWriteContract } from 'wagmi';

import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts.ts';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from '../abi/GatewayRegistration.abi';
import { useApproveSqd } from '../sqd';
import { errorMessage, TxResult, isApproveRequiredError, WriteContractRes } from '../utils';

type AddStakeGatewayRequest = {
  amount: string;
  wallet: SourceWallet;
};

function useAddStakeFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  const [approveSqd] = useApproveSqd();

  const tryCallContract = async ({ amount }: AddStakeGatewayRequest) => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.GATEWAY_REGISTRATION,
          abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
          functionName: 'addStake',
          args: [BigInt(amount)],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };

  return async (req: AddStakeGatewayRequest): Promise<TxResult> => {
    logger.debug(`stake to gateway via worker contract...`);

    const res = await tryCallContract(req);
    // Try to approve SQD
    if (isApproveRequiredError(res.error)) {
      const approveRes = await approveSqd({
        contractAddress: contracts.GATEWAY_REGISTRATION,
        amount: req.amount,
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

export function useAddStakeGateway() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeight();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stakeFromWallet = useAddStakeFromWallet();

  const addStakeToGateway = async (req: AddStakeGatewayRequest): Promise<WriteContractRes> => {
    setLoading(true);

    if (req.wallet.type !== AccountType.User) {
      throw new Error('Vesting contracts are not supported yet.');
    }

    const res = await stakeFromWallet(req);

    if (!res.tx) {
      setLoading(false);
      setError(res.error);

      return { success: false, failedReason: res.error };
    }

    if (!client) {
      return { success: false, failedReason: 'missing client' };
    }

    const receipt = await client.waitForTransactionReceipt({ hash: res.tx });
    setWaitHeight(receipt.blockNumber, []);

    setLoading(false);

    return { success: true };
  };

  return {
    addStakeToGateway,
    isLoading,
    error,
  };
}
