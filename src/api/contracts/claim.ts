import { useState } from 'react';

import { encodeFunctionData } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useWriteContract, useClient } from 'wagmi';

import { REWARD_TREASURY_CONTRACT_ABI } from '@api/contracts/reaward-treasury.abi';
import { VESTING_CONTRACT_ABI } from '@api/contracts/vesting.abi';
import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount.ts';
import { useContracts } from '@network/useContracts.ts';

import { TxResult, errorMessage, WriteContractRes } from './utils';

export type ClaimRequest = {
  wallet: SourceWallet;
};

function useClaimFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  return async ({ wallet }: ClaimRequest): Promise<TxResult> => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.REWARD_TREASURY,
          abi: REWARD_TREASURY_CONTRACT_ABI,
          functionName: 'claimFor',
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
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ wallet }: ClaimRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: REWARD_TREASURY_CONTRACT_ABI,
        functionName: 'claimFor',
        args: [contracts.REWARD_DISTRIBUTION, account as `0x${string}`],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: wallet.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.REWARD_TREASURY, data],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useClaim() {
  const client = useClient();
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

    const receipt = await waitForTransactionReceipt(client!, { hash: res.tx });
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
