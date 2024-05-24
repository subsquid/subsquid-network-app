import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import useLocalStorageState from 'use-local-storage-state';
import { useWalletClient, useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { arbitrum, arbitrumSepolia } from 'wagmi/chains';

import { localStorageStringSerializer } from '@hooks/useLocalStorageState.ts';

export enum NetworkName {
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

const defaultApp = (process.env.DEFAULT_NETWORK as NetworkName) || NetworkName.Mainnet;

function validate(app: NetworkName): NetworkName {
  return Object.values(NetworkName).includes(app) ? (app as NetworkName) : defaultApp;
}

export function useSubsquidNetwork() {
  const queryClient = useQueryClient();
  const walletClient = useWalletClient();
  const { switchChainAsync } = useSwitchChain();
  const { isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const [app, setApp] = useLocalStorageState<NetworkName>('network', {
    serializer: localStorageStringSerializer,
    defaultValue: defaultApp,
    storageSync: false,
  });

  const changeApp = useCallback(
    (network: NetworkName) => {
      setApp(network);
      queryClient.clear();
    },
    [queryClient, setApp],
  );

  const switchAndReset = async (network: NetworkName) => {
    if (isConnected) {
      try {
        await switchChainAsync?.({ chainId: getChainId(network) });
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.message.toLowerCase().includes('user rejected the request')) return;
          if (e.message.toLowerCase().includes('already pending for origin')) return;
        }

        throw e;
      }
    }

    changeApp(network);
    // eslint-disable-next-line no-console
    console.log('switched to ' + network);
  };

  useEffect(() => {
    if (!isConnected || walletClient.isLoading) return;
    if (chain?.id === getChainId(app)) return;

    if (chain) {
      changeApp(getNetworkName(chain.id));
      return;
    }

    disconnect();
  }, [isConnected, chain, app, disconnect, walletClient, changeApp]);

  return {
    network: NetworkName.Testnet, // validate(app),
    switchAndReset,
  };
}

export function getChainId(network: NetworkName) {
  return network === NetworkName.Mainnet ? arbitrum.id : arbitrumSepolia.id;
}

export function getNetworkName(chainId: number) {
  return chainId === arbitrum.id ? NetworkName.Mainnet : NetworkName.Testnet;
}
