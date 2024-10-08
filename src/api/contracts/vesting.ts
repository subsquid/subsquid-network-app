import { useState } from 'react';

import { keepPreviousData } from '@tanstack/react-query';
import { chunk } from 'lodash-es';
import { erc20Abi, MulticallResponse } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useReadContracts, useWriteContract, useClient } from 'wagmi';

import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { errorMessage, WriteContractRes } from './utils';
import { VESTING_CONTRACT_ABI } from './abi/vesting.abi';

export function useVestingContracts({ addresses }: { addresses?: `0x${string}`[] }) {
  const contracts = useContracts();
  const { currentHeight, isLoading: isSquidHeightLoading } = useSquidNetworkHeight();

  const { data, isLoading } = useReadContracts({
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
          abi: erc20Abi,
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
    blockNumber: BigInt(currentHeight),
    query: {
      enabled: !isSquidHeightLoading && !!addresses?.length,
      placeholderData: keepPreviousData,
      select: res => {
        if (res?.some(r => r.status === 'success')) {
          return chunk(res, 8).map(ch => ({
            start: Number(unwrapResult(ch[0])) * 1000,
            end: Number(unwrapResult(ch[1])) * 1000,
            deposited: unwrapResult(ch[2])?.toString(),
            releasable: unwrapResult(ch[3])?.toString(),
            released: unwrapResult(ch[4])?.toString(),
            balance: unwrapResult(ch[5])?.toString(),
            initialRelease: Number(unwrapResult(ch[6]) || 0) / 100,
            expectedTotal: unwrapResult(ch[7])?.toString(),
          }));
        } else if (res?.length === 0) {
          return [];
        }

        return undefined;
      },
    },
  });

  return {
    data,
    isLoading: isLoading,
  };
}

export function useVestingContract({ address }: { address?: `0x${string}` }) {
  const { data, isLoading } = useVestingContracts({ addresses: address ? [address] : [] });

  return {
    data: data?.[0],
    isLoading,
  };
}

function unwrapResult<T>(result?: MulticallResponse<T>): T | undefined {
  return result?.status === 'success' ? (result.result as T) : undefined;
}

export function useVestingContractRelease() {
  const client = useClient();
  const { setWaitHeight } = useSquidNetworkHeight();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { SQD } = useContracts();

  const { writeContractAsync } = useWriteContract({});

  const release = async ({ address }: { address: `0x${string}` }): Promise<WriteContractRes> => {
    setLoading(true);

    try {
      const hash = await writeContractAsync({
        abi: VESTING_CONTRACT_ABI,
        functionName: 'release',
        args: [SQD],
        address,
      });

      const receipt = await waitForTransactionReceipt(client!, { hash });
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
