import { useState } from 'react';

import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { AccountType } from '@api/subsquid-network-squid';
import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { errorMessage, TxResult, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from './GatewayRegistration.abi';

type UnstakeGatewayRequest = {
  gateway: BlockchainGateway;
};

function useUnstakeFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.GATEWAY_REGISTRATION,
    abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
    functionName: 'unstake',
  });

  return async (req: UnstakeGatewayRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeAsync({}),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useUnstakeFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ gateway }: UnstakeGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'unstake',
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: gateway.owner.id as `0x${string}`,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'execute',
        args: [contracts.GATEWAY_REGISTRATION, data],
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

export function useUnstakeGateway() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unstakeFromWallet = useUnstakeFromWallet();
  const unstakeFromVestingContract = useUnstakeFromVestingContract();

  const unstakeFromGateway = async (req: UnstakeGatewayRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const res =
      req.gateway.owner.type === AccountType.User
        ? await unstakeFromWallet(req)
        : await unstakeFromVestingContract(req);

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
    unstakeFromGateway,
    isLoading,
    error,
  };
}
