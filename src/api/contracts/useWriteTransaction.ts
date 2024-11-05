import { useState } from 'react';

import { MutateOptions } from '@tanstack/react-query';
import {
  readContract,
  waitForTransactionReceipt,
  WaitForTransactionReceiptReturnType,
  writeContract,
} from '@wagmi/core';
import {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  encodeFunctionData,
  erc20Abi,
  WriteContractErrorType,
} from 'viem';
import {
  Config,
  ResolvedRegister,
  useAccount,
  useBalance,
  useConfig,
  useWriteContract,
  UseWriteContractParameters,
  UseWriteContractReturnType,
} from 'wagmi';
import { WriteContractData, WriteContractVariables } from 'wagmi/query';

import { useContracts } from '@network/useContracts';

import { vestingAbi } from './subsquid.generated';

export type UseWriteTransactionParameters<
  config extends Config,
  context,
> = UseWriteContractParameters<config, context>;

export type UseWriteTransactionReturnType<config extends Config = Config, context = unknown> = Omit<
  UseWriteContractReturnType<config, context>,
  'writeContractAsync' | 'writeContract'
> & {
  writeTransactionAsync: WriteTransactionMutateAsync<config, context>;
};

export type WriteTransactionMutateAsync<config extends Config, context = unknown> = <
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  chainId extends config['chains'][number]['id'],
>(
  variables: WriteContractVariables<abi, functionName, args, config, chainId> & {
    approve?: bigint;
    vesting?: Address;
  },
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<
          abi,
          functionName,
          args,
          config,
          chainId,
          // use `functionName` to make sure it's not union of all possible function names
          functionName
        >,
        context
      >
    | undefined,
) => Promise<WaitForTransactionReceiptReturnType<config, chainId>>;

export function useWriteSQDTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteTransactionParameters<config, context> = {},
): UseWriteTransactionReturnType<config, context> {
  const account = useAccount();
  const { data: ethBalance } = useBalance({
    address: account.address,
    query: { enabled: !!account.address },
  });

  const config = useConfig(parameters);
  const { writeContractAsync, ...result } = useWriteContract(parameters);
  const [isPending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<WriteContractErrorType | null>(null);
  const { SQD } = useContracts();

  return {
    ...(result as any),
    isPending,
    error,
    isError: !!error,
    writeTransactionAsync: async (
      ...args: Parameters<WriteTransactionMutateAsync<config, context>>
    ) => {
      setPending(true);
      try {
        if (!ethBalance?.value) {
          throw new Error('Insufficient ETH balance');
        }

        const address =
          (typeof args[0].account === 'string' ? args[0].account : args[0].account?.address) ||
          account.address;
        if (!address) return;

        let hash: `0x${string}`;
        if (args[0].vesting) {
          const { vesting, address, ...rest } = args[0];

          const encodedFunctionData = encodeFunctionData({
            abi: args[0].abi,
            functionName: args[0].functionName,
            args: args[0].args,
          });

          hash = await writeContractAsync(
            {
              ...(args[0] as any),
              address: vesting,
              abi: vestingAbi,
              functionName: 'execute',
              args: args[0].approve
                ? [address, encodedFunctionData, rest.approve]
                : [address, encodedFunctionData],
            },
            args[1] as any,
          );
        } else {
          if (args[0].approve) {
            const amount = args[0].approve;

            const allowance = await readContract(config, {
              abi: erc20Abi,
              functionName: 'allowance',
              address: SQD,
              args: [address, args[0].address],
            });

            if (allowance < amount) {
              const hash = await writeContract(config as any, {
                ...(args[0] as any),
                abi: erc20Abi,
                functionName: 'approve',
                address: SQD,
                args: [args[0].address, amount],
              });
              await waitForTransactionReceipt(config, { hash });
            }
          }

          hash = await writeContractAsync(args[0], args[1] as any);
        }

        return await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        setError(e as WriteContractErrorType);
        throw e;
      } finally {
        setPending(false);
      }
    },
  };
}
