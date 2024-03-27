import { useState } from 'react';

import { logger } from '@logger';
import { encodeFunctionData } from 'viem';
import { useContractWrite, usePublicClient, useWalletClient } from 'wagmi';

import { AccountType } from '@api/subsquid-network-squid';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { errorMessage, peerIdToHex, TxResult, WriteContractRes } from '../utils';
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
  const { writeAsync } = useContractWrite({
    address: contracts.GATEWAY_REGISTRATION,
    abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
    functionName: 'register',
  });

  return async ({ peerId, ...rest }: RegisterGatewayRequest): Promise<TxResult> => {
    logger.debug(`registering gateway via worker contract...`);

    try {
      return { tx: await writeAsync({ args: [peerIdToHex(peerId), encodeGatewayMetadata(rest)] }) };
    } catch (e: unknown) {
      return {
        error: errorMessage(e),
      };
    }
  };
}

function useRegisterGatewayFromVestingContract() {
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  return async ({ peerId, source, ...rest }: RegisterGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'register',
        args: [peerIdToHex(peerId), encodeGatewayMetadata(rest)], // encodeMetadata(rest)
      });

      const { request } = await publicClient.simulateContract({
        account,
        address: source.id as `0x${string}`,
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

export function useRegisterGateway() {
  const client = usePublicClient();
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const { setWaitHeight } = useSquidNetworkHeightHooks();
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

    const receipt = await client.waitForTransactionReceipt({ hash: tx.hash });
    setWaitHeight(receipt.blockNumber, ['myGateways', { address }]);
    setLoading(false);
    setError(null);

    return { success: true };
  };

  return { registerGateway, isLoading, error };
}
