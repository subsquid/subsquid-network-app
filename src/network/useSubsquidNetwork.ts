import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import useLocalStorageState from 'use-local-storage-state';
import { useWalletClient, useAccount, useNetwork, useDisconnect, useSwitchNetwork } from 'wagmi';
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
  const { switchNetworkAsync } = useSwitchNetwork({ throwForSwitchChainNotSupported: true });
  const account = useAccount();
  const { chain } = useNetwork();
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
    if (account.isConnected) {
      try {
        await switchNetworkAsync?.(getChainId(network));
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.message.toLowerCase().includes('user rejected the request')) return;
          if (e.message.toLowerCase().includes('already pending for origin')) return;
        }

        throw e;
      }
    }

    changeApp(network);
    console.log('switched to ' + network);
  };

  useEffect(() => {
    if (!account.isConnected || walletClient.isLoading) return;
    if (chain?.id === getChainId(app)) return;

    if (chain && !chain.unsupported) {
      changeApp(getNetworkName(chain.id));
      return;
    }

    disconnect();
  }, [account, app, chain, disconnect, walletClient, changeApp]);

  return { network: validate(app), switchAndReset };
}

export function getChainId(network: NetworkName) {
  return network === NetworkName.Mainnet ? arbitrum.id : arbitrumSepolia.id;
}

export function getNetworkName(chainId: number) {
  return chainId === arbitrum.id ? NetworkName.Mainnet : NetworkName.Testnet;
}
