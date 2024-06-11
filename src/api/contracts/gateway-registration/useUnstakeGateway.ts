import { useState } from 'react';

import { encodeFunctionData } from 'viem';
import { useWriteContract, usePublicClient } from 'wagmi';

import { AccountType, GatewayStakeFragmentFragment } from '@api/subsquid-network-squid';
import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { TxResult, errorMessage, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from './GatewayRegistration.abi';

type UnstakeGatewayRequest = {
  operator: GatewayStakeFragmentFragment;
};

function useUnstakeFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  return async ({}: UnstakeGatewayRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.GATEWAY_REGISTRATION,
          abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
          functionName: 'unstake',
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useUnstakeFromVestingContract() {
  const contracts = useContracts();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ operator }: UnstakeGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'unstake',
      });

      return {
        tx: await writeContractAsync({
          account,
          address: operator.account.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.GATEWAY_REGISTRATION, data],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useUnstakeGateway() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeight();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unstakeFromWallet = useUnstakeFromWallet();
  const unstakeFromVestingContract = useUnstakeFromVestingContract();

  const unstakeFromGateway = async (req: UnstakeGatewayRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const res =
      req.operator.account.type === AccountType.User
        ? await unstakeFromWallet(req)
        : await unstakeFromVestingContract(req);

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
    unstakeFromGateway,
    isLoading,
    error,
  };
}
