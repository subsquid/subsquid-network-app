import { useState } from 'react';

import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { REWARD_TREASURY_CONTRACT_ABI } from '@api/contracts/reaward-treasury.abi';
import { errorMessage, TxResult, WriteContractRes } from '@api/contracts/utils';
import { VESTING_CONTRACT_ABI } from '@api/contracts/vesting.abi';
import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount.ts';
import { useContracts } from '@network/useContracts.ts';

export type ClaimRequest = {
  wallet: SourceWallet;
};

function useClaimFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.REWARD_TREASURY,
    abi: REWARD_TREASURY_CONTRACT_ABI,
    functionName: 'claimFor',
  });

  return async ({ wallet }: ClaimRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeAsync({
          args: [contracts.REWARD_DISTRIBUTION, wallet.id as `0x${string}`],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };
}

function useClaimFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ wallet }: ClaimRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: REWARD_TREASURY_CONTRACT_ABI,
        functionName: 'claimFor',
        args: [contracts.REWARD_DISTRIBUTION, wallet.id as `0x${string}`],
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: wallet.id as `0x${string}`,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'execute',
        args: [contracts.REWARD_TREASURY, data],
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

export function useClaim() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const claimFromWallet = useClaimFromWallet();
  const claimFromVestingContract = useClaimFromVestingContract();

  const claim = async ({ wallet }: ClaimRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const res =
      wallet.type === AccountType.User
        ? await claimFromWallet({ wallet })
        : await claimFromVestingContract({ wallet });

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
    claim,
    isLoading,
    error,
  };
}
