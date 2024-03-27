import { useState } from 'react';

import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { AccountType } from '@api/subsquid-network-squid';
import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { errorMessage, peerIdToHex, TxResult, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from './GatewayRegistration.abi';

export interface UnregisterGatewayRequest {
  gateway: BlockchainGateway;
}

function useUnregisterGatewayFromWallet() {
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.GATEWAY_REGISTRATION,
    abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
    functionName: 'unregister',
  });

  return async ({ gateway }: UnregisterGatewayRequest): Promise<TxResult> => {
    logger.debug(`unregistering gateway via worker contract...`);

    try {
      return { tx: await writeAsync({ args: [peerIdToHex(gateway.id)] }) };
    } catch (e: unknown) {
      return {
        error: errorMessage(e),
      };
    }
  };
}

function useUnregisterGatewayFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ gateway }: UnregisterGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'unregister',
        args: [peerIdToHex(gateway.id)],
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

export function useUnregisterGateway() {
  const client = usePublicClient();
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const unregisterGatewayFromWallet = useUnregisterGatewayFromWallet();
  const unregisterGatewayFromVestingContract = useUnregisterGatewayFromVestingContract();

  const unregisterGateway = async (req: UnregisterGatewayRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const { tx, error } =
      req.gateway.owner.type === AccountType.User
        ? await unregisterGatewayFromWallet(req)
        : await unregisterGatewayFromVestingContract(req);

    if (!tx) {
      logger.debug(`unregistering gateway failed ${error}`);
      setLoading(false);
      setError(error);
      return { success: false, failedReason: error };
    }

    const receipt = await client.waitForTransactionReceipt({ hash: tx.hash });
    setWaitHeight(receipt.blockNumber, ['myGateways', { address }]);
    setLoading(false);
    setError(null);

    return { success: true };
  };

  return { unregisterGateway, isLoading, error };
}
