import useLocalStorageState from 'use-local-storage-state';

import { localStorageStringSerializer } from '@hooks/useLocalStorageState.ts';

export enum NetworkName {
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

const defaultApp = (process.env.DEFAULT_NETWORK as NetworkName) || NetworkName.Testnet;

function validate(app: NetworkName): NetworkName {
  return Object.values(NetworkName).includes(app) ? (app as NetworkName) : defaultApp;
}

export function useSubsquidNetwork(): [NetworkName, (app: NetworkName) => void] {
  const [app, changeApp] = useLocalStorageState<NetworkName>('network', {
    serializer: localStorageStringSerializer,
    defaultValue: defaultApp,
  });

  return [validate(app), changeApp];
}
