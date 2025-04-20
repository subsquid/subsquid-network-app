import { useState } from 'react';

import * as Sentry from '@sentry/react';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { erc20Abi } from 'viem';
import {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
  encodeFunctionData,
} from 'viem';
import { useConfig, useWriteContract } from 'wagmi';

import { useContracts } from '@network/useContracts';

import { vestingAbi } from './subsquid.generated';

type WriteTransactionParams<TAbi extends Abi, TFunctionName extends ContractFunctionName<TAbi>> = {
  abi: TAbi;
  address: Address;
  functionName: TFunctionName;
  args?: ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctionName>;
  approve?: bigint;
  vesting?: Address;
};

type WriteTransactionResult = {
  isPending: boolean;
  error: Error | null;
  isError: boolean;
  writeTransactionAsync: <TAbi extends Abi, TFunctionName extends ContractFunctionName<TAbi>>(
    params: WriteTransactionParams<TAbi, TFunctionName>,
  ) => Promise<TransactionReceipt>;
};

export function useWriteSQDTransaction({}: object = {}): WriteTransactionResult {
  const config = useConfig();
  const { writeContractAsync, ...result } = useWriteContract();
  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { SQD } = useContracts();

  return {
    ...result,
    isPending,
    error,
    isError: !!error,
    writeTransactionAsync: async <
      TAbi extends Abi,
      TFunctionName extends ContractFunctionName<TAbi>,
    >(
      params: WriteTransactionParams<TAbi, TFunctionName>,
    ) => {
      setPending(true);
      try {
        const { approve, vesting, ...writeParams } = params;

        let hash: `0x${string}`;
        if (vesting) {
          const encodedFunctionData = encodeFunctionData({
            abi: writeParams.abi,
            functionName: writeParams.functionName,
            args: writeParams.args,
          } as Parameters<typeof encodeFunctionData>[0]);

          hash = await writeContractAsync({
            address: vesting,
            abi: vestingAbi,
            functionName: 'execute',
            args: approve
              ? [writeParams.address, encodedFunctionData, approve]
              : [writeParams.address, encodedFunctionData],
          } as Parameters<typeof writeContractAsync>[0]);
        } else {
          if (approve) {
            const allowance = await readContract(config, {
              abi: erc20Abi,
              functionName: 'allowance',
              address: SQD,
              args: [writeParams.address, params.address],
            });

            if (allowance < approve) {
              const hash = await writeContract(config, {
                abi: erc20Abi,
                functionName: 'approve',
                address: SQD,
                args: [params.address, approve],
              });
              await waitForTransactionReceipt(config, { hash });
            }
          }

          // FIXME: this is a workaround for wagmi types,
          // probably makes sense to do it in a different way
          hash = await writeContractAsync(writeParams as Parameters<typeof writeContractAsync>[0]);
        }

        return await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        Sentry.captureException(e, {
          extra: {
            params,
            config,
          },
        });

        setError(e as Error);
        throw e;
      } finally {
        setPending(false);
      }
    },
  };
}
