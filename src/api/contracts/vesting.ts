import { useState } from 'react';

import { chunk } from 'lodash-es';
import { MulticallResult } from 'viem';
import { erc20ABI, useContractReads, useContractWrite, usePublicClient } from 'wagmi';

import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { errorMessage, WriteContractRes } from './utils';
import { VESTING_CONTRACT_ABI } from './vesting.abi';

export function useVestings({ addresses }: { addresses?: `0x${string}`[] }) {
  const contracts = useContracts();
  const { currentHeight, isLoading: isHeightLoading } = useSquidNetworkHeightHooks();

  const { data, isLoading } = useContractReads({
    contracts: addresses?.flatMap(address => {
      const vestingContract = { abi: VESTING_CONTRACT_ABI, address } as const;
      return [
        {
          ...vestingContract,
          functionName: 'start',
        },
        {
          ...vestingContract,
          functionName: 'end',
        },
        {
          ...vestingContract,
          functionName: 'depositedIntoProtocol',
        },
        {
          ...vestingContract,
          functionName: 'releasable',
          args: [contracts.SQD],
        },
        {
          ...vestingContract,
          functionName: 'released',
          args: [contracts.SQD],
        },
        {
          abi: erc20ABI,
          address: contracts.SQD,
          functionName: 'balanceOf',
          args: [address],
        },
        {
          ...vestingContract,
          functionName: 'immediateReleaseBIP',
        },
        {
          ...vestingContract,
          functionName: 'expectedTotalAmount',
        },
      ] as const;
    }),
    allowFailure: true,
    enabled: !!addresses && !isHeightLoading,
    blockNumber: currentHeight ? BigInt(currentHeight) : undefined,
  });

  return {
    data: data
      ? chunk(data, 8).map(ch => ({
          start: Number(unwrapResult(ch[0])) * 1000,
          end: Number(unwrapResult(ch[1])) * 1000,
          deposited: unwrapResult(ch[2])?.toString(),
          releasable: unwrapResult(ch[3])?.toString(),
          released: unwrapResult(ch[4])?.toString(),
          balance: unwrapResult(ch[5])?.toString(),
          initialRelease: Number(unwrapResult(ch[6]) || 0) / 100,
          expectedTotal: unwrapResult(ch[7])?.toString(),
        }))
      : undefined,
    isLoading,
  };
}

export function useVesting({ address }: { address?: `0x${string}` }) {
  const { data, isLoading } = useVestings({ addresses: address ? [address] : undefined });

  return {
    data: data?.[0],
    isLoading,
  };
}

function unwrapResult<T>(result?: MulticallResult<T>): T | undefined {
  return result?.status === 'success' ? (result.result as T) : undefined;
}

export function useVestingRelease({ address }: { address?: `0x${string}` }) {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { SQD } = useContracts();

  const { writeAsync } = useContractWrite({
    abi: VESTING_CONTRACT_ABI,
    functionName: 'release',
    args: [SQD],
    address,
  });

  const release = async (): Promise<WriteContractRes> => {
    setLoading(true);

    try {
      const tx = await writeAsync();

      const receipt = await client.waitForTransactionReceipt(tx);
      setWaitHeight(receipt.blockNumber, []);

      return { success: true };
    } catch (e) {
      const failedReason = errorMessage(e);
      setError(failedReason);
      return { success: false, failedReason };
    } finally {
      setLoading(false);
    }
  };

  return {
    release,
    isLoading,
    error,
  };
}
