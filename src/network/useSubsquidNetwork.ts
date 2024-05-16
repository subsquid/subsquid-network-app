import { useQueryClient } from '@tanstack/react-query';
import useLocalStorageState from 'use-local-storage-state';
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
  const [app, changeApp] = useLocalStorageState<NetworkName>('network', {
    serializer: localStorageStringSerializer,
    defaultValue: defaultApp,
  });

  const queryClient = useQueryClient();

  const switchAndReset = (network: NetworkName) => {
    changeApp(network);
    queryClient.clear();
  };

  return { network: validate(app), switchAndReset };
}

export function getChainId(network: NetworkName) {
  return network === NetworkName.Mainnet ? arbitrum.id : arbitrumSepolia.id;
}

export function getNetworkName(chainId?: number) {
  return chainId === arbitrum.id ? NetworkName.Mainnet : NetworkName.Testnet;
}
