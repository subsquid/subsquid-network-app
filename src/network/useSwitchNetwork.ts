import { useCallback, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { arbitrum, arbitrumSepolia } from 'viem/chains';
import { useAccount, useDisconnect, useNetwork, useWalletClient } from 'wagmi';

import { SQD_DECIMALS, SQD_TOKEN } from '@api/contracts/consts.ts';
import { useContracts } from '@network/useContracts.ts';

import { NetworkName, useSubsquidNetwork } from './useSubsquidNetwork.ts';

export function getChainId(network: NetworkName) {
  return network === NetworkName.Mainnet ? arbitrum.id : arbitrumSepolia.id;
}

export function getNetworkName(chainId?: number) {
  return chainId === arbitrum.id ? NetworkName.Mainnet : NetworkName.Testnet;
}

export function useSwitchSubsquidNetwork() {
  const contracts = useContracts();
  const { isConnected, connector } = useAccount();
  const { isLoading } = useWalletClient();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { enqueueSnackbar } = useSnackbar();
  const { network, changeAndReset } = useSubsquidNetwork();

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
    if (!isConnected || isLoading) return;

    if (chain?.id === getChainId(network)) return;

    if (!chain?.unsupported) {
      return changeAndReset(getNetworkName(chain?.id));
    }

    disconnect();
  }, [chain, disconnect, isConnected, network, isLoading, changeAndReset]);
}
