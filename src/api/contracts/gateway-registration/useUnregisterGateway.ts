import { useState } from 'react';

import { peerIdToHex } from '@lib/network';
import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { useWriteContract, usePublicClient } from 'wagmi';

import { AccountType } from '@api/subsquid-network-squid';
import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { TxResult, errorMessage, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from './GatewayRegistration.abi';

export interface UnregisterGatewayRequest {
  gateway: BlockchainGateway;
}

function useUnregisterGatewayFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract();

  return async ({ gateway }: UnregisterGatewayRequest): Promise<TxResult> => {
    logger.debug(`unregistering gateway via worker contract...`);

    try {
      return {
        tx: await writeContractAsync({
          address: contracts.GATEWAY_REGISTRATION,
          abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
          functionName: 'unregister',
          args: [peerIdToHex(gateway.id)],
        }),
      };
    } catch (e: unknown) {
      return {
        error: errorMessage(e),
      };
    }
  };
}

function useUnregisterGatewayFromVestingContract() {
  const contracts = useContracts();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract();

  return async ({ gateway }: UnregisterGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'unregister',
        args: [peerIdToHex(gateway.id)],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: gateway.owner.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.GATEWAY_REGISTRATION, data],
        }),
      };
    } catch (e: unknown) {
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

    if (!client) {
      return { success: false, failedReason: 'missing client' };
    }

    const receipt = await client.waitForTransactionReceipt({ hash: tx });
    setWaitHeight(receipt.blockNumber, ['myGateways', { address }]);
    setLoading(false);
    setError(null);

    return { success: true };
  };

  return { unregisterGateway, isLoading, error };
}
