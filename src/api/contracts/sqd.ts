import { logger } from '@logger';
import { WriteContractResult } from '@wagmi/core';
import Decimal from 'decimal.js';
import { erc20ABI, useContractWrite, usePublicClient } from 'wagmi';

import { useContracts } from '@network/useContracts.ts';

import { errorMessage, WriteContractRes } from './utils';

export function useApproveSqd() {
  const client = usePublicClient();
  const contracts = useContracts();
  const { writeAsync } = useContractWrite({
    address: contracts.SQD,
    abi: erc20ABI,
    functionName: 'approve',
  });

  async function approve({
    contractAddress,
    amount,
  }: {
    contractAddress: `0x${string}`;
    amount: Decimal;
  }): Promise<WriteContractRes> {
    let tx: WriteContractResult;
    logger.debug(`approving SQD to ${contracts.WORKER_REGISTRATION}...`);
    try {
      tx = await writeAsync({
        args: [contractAddress, BigInt(amount.toFixed(0))],
      });
    } catch (e) {
      const error = errorMessage(e);

      return { success: false, failedReason: error };
    }

    if (!tx) {
      logger.debug(`SQF approve failed with unknown error`);
      return { success: false, failedReason: 'unknown error' };
    }

    logger.debug(`waiting confirm of SQD approving tx ${tx.hash}`);
    await client.waitForTransactionReceipt({ hash: tx.hash });
    logger.info(`SQD approved, tx ${tx.hash}, completed!`);

    return { success: true };
  }

  return [approve];
}
