import { useState } from 'react';

import * as Sentry from '@sentry/react';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { ContractFunctionExecutionError, createPublicClient, erc20Abi, http } from 'viem';
import {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  TransactionReceipt,
  encodeFunctionData,
} from 'viem';
import { useConfig, useWriteContract } from 'wagmi';
import { arbitrum } from 'wagmi/chains';

import { useContracts } from '@network/useContracts';
import { getSubsquidNetwork, NetworkName } from '@network/useSubsquidNetwork';

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
        if (e instanceof Error && !/rejected/i.test(e.message)) {
          let params: any;

          if (e instanceof ContractFunctionExecutionError) {
            const { abi, functionName, args } = e;
            params = { abi, functionName, args };

            if (
              process.env.NODE_ENV === 'production' &&
              getSubsquidNetwork() === NetworkName.Mainnet
            ) {
              const client = createPublicClient({
                chain: arbitrum,
                transport: http(`${window.location.origin}/rpc/arbitrum-one-tenderly`),
              });

              const data = encodeFunctionData(params);
              // NOTE: we do not really care about the result
              client
                .request({
                  method: 'tenderly_simulateTransaction',
                  params: [
                    {
                      from: e.sender!,
                      to: e.contractAddress,
                      data,
                    },
                  ],
                } as any)
                .catch(() => {});
            }
          }

          Sentry.captureException(e, {
            extra: {
              args: params,
              connections: JSON.stringify(
                Array.from(config.state.connections.values()).map(c => ({
                  accounts: c.accounts,
                  chainId: c.chainId,
                  connector: {
                    id: c.connector.id,
                    name: c.connector.name,
                    type: c.connector.type,
                    transport: c.connector.transport,
                  },
                })),
              ),
            },
          });
        }

        setError(e as Error);
        throw e;
      } finally {
        setPending(false);
      }
    },
  };
}
