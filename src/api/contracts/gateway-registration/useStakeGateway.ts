import { useState } from 'react';

import { logger } from '@logger';
import Decimal from 'decimal.js';
import { encodeFunctionData } from 'viem';
import { usePublicClient, useWriteContract } from 'wagmi';

import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks.ts';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts.ts';

import { useApproveSqd } from '../sqd';
import { errorMessage, isApproveRequiredError, toSqd, TxResult, WriteContractRes } from '../utils';
import { VESTING_CONTRACT_ABI } from '../vesting.abi';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from './GatewayRegistration.abi';

type StakeGatewayRequest = {
  gateway: BlockchainGateway;
  amount: number;
  durationBlocks: number;
  autoExtension: boolean;
  wallet: SourceWallet;
};

function useStakeFromWallet() {
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  const [approveSqd] = useApproveSqd();

  const tryCallContract = async ({
    autoExtension,
    amount,
    durationBlocks,
  }: StakeGatewayRequest) => {
    try {
      return {
        tx: await writeContractAsync({
          address: contracts.GATEWAY_REGISTRATION,
          abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
          functionName: 'stake',
          args: [toSqd(amount), BigInt(durationBlocks), autoExtension],
        }),
      };
    } catch (e) {
      return { error: errorMessage(e) };
    }
  };

  return async (req: StakeGatewayRequest): Promise<TxResult> => {
    logger.debug(`stake to gateway via worker contract...`);

    const res = await tryCallContract(req);
    // Try to approve SQD
    if (isApproveRequiredError(res.error)) {
      const approveRes = await approveSqd({
        contractAddress: contracts.GATEWAY_REGISTRATION,
        amount: new Decimal(toSqd(req.amount).toString()),
      });
      if (!approveRes.success) {
        return { error: approveRes.failedReason };
      }

      logger.debug(`approved SQD successfully, now trying to register one more time...`);

      return tryCallContract(req);
    }

    return res;
  };
}

function useStakeFromVestingContract() {
  const contracts = useContracts();
  const { address: account } = useAccount();
  const { writeContractAsync } = useWriteContract({});

  return async ({
    amount,
    wallet,
    autoExtension,
    durationBlocks,
  }: StakeGatewayRequest): Promise<TxResult> => {
    try {
      const data = encodeFunctionData({
        abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
        functionName: 'stake',
        args: [toSqd(amount), BigInt(durationBlocks), autoExtension],
      });

      return {
        tx: await writeContractAsync({
          account,
          address: wallet.id as `0x${string}`,
          abi: VESTING_CONTRACT_ABI,
          functionName: 'execute',
          args: [contracts.GATEWAY_REGISTRATION, data, toSqd(amount)],
        }),
      };
    } catch (e: unknown) {
      return { error: errorMessage(e) };
    }
  };
}

export function useStakeGateway() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeightHooks();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stakeFromWallet = useStakeFromWallet();
  const stakeFromVestingContract = useStakeFromVestingContract();

  const stakeToGateway = async (req: StakeGatewayRequest): Promise<WriteContractRes> => {
    setLoading(true);

    const res =
      req.wallet.type === AccountType.User
        ? await stakeFromWallet(req)
        : await stakeFromVestingContract(req);

    if (!res.tx) {
      setLoading(false);
      setError(res.error);

      return { success: false, failedReason: res.error };
    }

    if (!client) {
      return { success: false, failedReason: 'missing client' };
    }

    const receipt = await client.waitForTransactionReceipt({ hash: res.tx });
    setWaitHeight(receipt.blockNumber, []);

    setLoading(false);

    return { success: true };
  };

  return {
    stakeToGateway,
    isLoading,
    error,
  };
}
