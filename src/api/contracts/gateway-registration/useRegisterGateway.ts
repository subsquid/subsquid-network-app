import { useState } from 'react';

import { peerIdToHex } from '@lib/network';
import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { usePublicClient, useWriteContract } from 'wagmi';

import { AccountType } from '@api/subsquid-network-squid';
import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { TxResult, errorMessage, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { encodeGatewayMetadata, GetawayMetadata } from './GatewayMetadata';
import { GATEWAY_REGISTRATION_CONTRACT_ABI } from './GatewayRegistration.abi';

export interface RegisterGatewayRequest extends GetawayMetadata {
  peerId: string;
  source: {
    id: string;
    type: AccountType;
  };
}

function useRegisterGatewayFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  return async ({ peerId, ...rest }: RegisterGatewayRequest): Promise<TxResult> => {
    logger.debug(`registering gateway via worker contract...`);

    try {
      return {
        tx: await writeContractAsync({
          address: contracts.GATEWAY_REGISTRATION,
          abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
          functionName: 'register',
          args: [peerIdToHex(peerId), encodeGatewayMetadata(rest)],
        }),
      };
    } catch (e: unknown) {
      return {
        error: errorMessage(e),
      };
    }
  };
}

function useRegisterGatewayFromVestingContract() {
  const contracts = useContracts();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({ peerId, source, ...rest }: RegisterGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'register',
        args: [peerIdToHex(peerId), encodeGatewayMetadata(rest)], // encodeMetadata(rest)
      });

      return {
        tx: await writeContractAsync({
          account,
          address: source.id as `0x${string}`,
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

export function useRegisterGateway() {
  const client = usePublicClient();
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { setWaitHeight } = useSquidNetworkHeight();
  const registerGatewayFromWallet = useRegisterGatewayFromWallet();
  const registerGatewayFromVestingContract = useRegisterGatewayFromVestingContract();

  const registerGateway = async (req: RegisterGatewayRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const { tx, error } =
      req.source.type === AccountType.User
        ? await registerGatewayFromWallet(req)
        : await registerGatewayFromVestingContract(req);

    if (!tx) {
      logger.debug(`registering gateway failed ${error}`);
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

  return { registerGateway, isLoading, error };
}
