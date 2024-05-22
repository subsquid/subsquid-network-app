import { useEffect, useRef, useState } from 'react';

import { chunk } from 'lodash-es';
import { erc20Abi, MulticallResponse } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { useReadContracts, useWriteContract, useClient } from 'wagmi';

import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { errorMessage, WriteContractRes } from './utils';
import { VESTING_CONTRACT_ABI } from './vesting.abi';

export function useVestingContracts({ addresses }: { addresses: `0x${string}`[] }) {
  const contracts = useContracts();
  const { currentHeight, isLoading: isHeightLoading } = useSquidNetworkHeightHooks();

  const { data: res } = useReadContracts({
    contracts: addresses.flatMap(address => {
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
      enabled: !isHeightLoading && !!addresses.length,
    },
  });

  const data = useRef<
    | {
        start?: number;
        end?: number;
        deposited?: string | undefined;
        releasable?: string | undefined;
        released?: string | undefined;
        balance?: string | undefined;
        initialRelease?: number;
        expectedTotal?: string | undefined;
      }[]
    | undefined
  >(undefined);

  useEffect(() => {
    if (addresses.length === 0) {
      data.current = [];
    } else if (res?.some(r => r.status === 'success')) {
      data.current = chunk(res, 8).map(ch => ({
        start: Number(unwrapResult(ch[0])) * 1000,
        end: Number(unwrapResult(ch[1])) * 1000,
        deposited: unwrapResult(ch[2])?.toString(),
        releasable: unwrapResult(ch[3])?.toString(),
        released: unwrapResult(ch[4])?.toString(),
        balance: unwrapResult(ch[5])?.toString(),
        initialRelease: Number(unwrapResult(ch[6]) || 0) / 100,
        expectedTotal: unwrapResult(ch[7])?.toString(),
      }));
    }
  }, [addresses.length, res]);

  return addresses.length
    ? {
        data: data.current,
        isLoading: !data.current,
      }
    : {
        data: [],
        isLoading: false,
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
  const { setWaitHeight } = useSquidNetworkHeightHooks();
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
