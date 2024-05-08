import { useCallback, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { SQD_DECIMALS, SQD_TOKEN } from '@api/contracts/consts.ts';
import { useContracts } from '@network/useContracts.ts';

import { chains } from './config.ts';

export function useSwitchNetwork() {
  const contracts = useContracts();
  const { isConnected, connector } = useAccount();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { enqueueSnackbar } = useSnackbar();

  const importMetamaskSqdToken = useCallback(async () => {
    if (!connector) return;

    const provider = await connector.getProvider();

    let tokenImported = false;
    try {
      const wasAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: contracts.SQD,
            symbol: SQD_TOKEN,
            decimals: SQD_DECIMALS,
          },
        },
      });

      tokenImported = !!wasAdded;
    } catch {}

    if (!tokenImported) {
      enqueueSnackbar('Adding tSQD to your MetaMask account will allow you track balance.', {
        title: 'Metamask',
        variant: 'subsquid',
        severity: 'warning',
      });
    }
  }, [connector, enqueueSnackbar, contracts.SQD]);

  useEffect(() => {
    if (!isConnected) return;
    else if (chains[0].id === chain?.id) return;

    disconnect();
  }, [chain?.id, disconnect, isConnected]);
}
