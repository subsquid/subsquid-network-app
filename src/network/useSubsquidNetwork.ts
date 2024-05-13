import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import useLocalStorageState from 'use-local-storage-state';
import { useSwitchNetwork } from 'wagmi';

import { localStorageStringSerializer } from '@hooks/useLocalStorageState.ts';

import { getChainId } from './useSwitchNetwork';

export enum NetworkName {
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

const defaultApp = (process.env.DEFAULT_NETWORK as NetworkName) || NetworkName.Testnet;

function validate(app: NetworkName): NetworkName {
  return Object.values(NetworkName).includes(app) ? (app as NetworkName) : defaultApp;
}

export function useSubsquidNetwork() {
  const [app, changeApp] = useLocalStorageState<NetworkName>('network', {
    serializer: localStorageStringSerializer,
    defaultValue: defaultApp,
  });

  const queryClient = useQueryClient();

  const changeAndReset = (network: NetworkName) => {
    changeApp(network);
    queryClient.clear();
  };

  return { network: validate(app), changeAndReset };
}
