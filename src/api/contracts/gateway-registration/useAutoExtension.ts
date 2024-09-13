import { useState } from 'react';

import { useWriteContract, usePublicClient } from 'wagmi';

import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from '../abi/GatewayRegistration.abi';
import { errorMessage, TxResult, WriteContractRes } from '../utils';

export function useAutoExtension() {
  const client = usePublicClient();
  const { setWaitHeight } = useSquidNetworkHeight();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contracts = useContracts();
  const { writeContractAsync } = useWriteContract({});

  const setAutoExtension = async (enable: boolean): Promise<WriteContractRes> => {
    setLoading(true);

    let res: TxResult;
    try {
      res = {
        tx: enable
          ? await writeContractAsync({
              address: contracts.GATEWAY_REGISTRATION,
              abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
              functionName: 'enableAutoExtension',
              args: [],
            })
          : await writeContractAsync({
              address: contracts.GATEWAY_REGISTRATION,
              abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
              functionName: 'disableAutoExtension',
              args: [],
            }),
      };
    } catch (e) {
      res = { error: errorMessage(e) };
    }

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
    setAutoExtension,
    isLoading,
    error,
  };
}
