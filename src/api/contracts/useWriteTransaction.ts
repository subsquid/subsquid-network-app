import { useState } from 'react';

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
import { useAccount, useConfig, useWriteContract } from 'wagmi';

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

type VestingExecuteParams = {
  address: Address;
  abi: typeof vestingAbi;
  functionName: 'execute';
  args: readonly [Address, `0x${string}`, bigint];
};

export function useWriteSQDTransaction({}: object = {}): WriteTransactionResult {
  const account = useAccount();
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
        const address = account.address;
        if (!address) throw new Error('No account connected');

        const { approve, vesting, ...writeParams } = params;

        let hash: `0x${string}`;
        if (vesting) {
          const encodedFunctionData = encodeFunctionData({
            abi: params.abi,
            functionName: params.functionName,
            args: params.args,
          } as Parameters<typeof encodeFunctionData>[0]);

          const vestingParams: VestingExecuteParams = {
            address: vesting,
            abi: vestingAbi,
            functionName: 'execute',
            args: [address, encodedFunctionData, params.approve ?? 0n],
          };

          hash = await writeContractAsync(vestingParams);
        } else {
          if (approve) {
            const allowance = await readContract(config, {
              abi: erc20Abi,
              functionName: 'allowance',
              address: SQD,
              args: [address, params.address],
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
          hash = await writeContractAsync({
            ...writeParams,
            account: address,
          } as Parameters<typeof writeContractAsync>[0]);
        }

        return await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setPending(false);
      }
    },
  };
}
