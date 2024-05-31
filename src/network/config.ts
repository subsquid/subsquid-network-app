import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { upperFirst } from 'lodash-es';
import { arbitrumSepolia, arbitrum } from 'wagmi/chains';

import { getSubsquidNetwork, NetworkName } from './useSubsquidNetwork';

// export let CHAIN: Chain = arbitrumSepolia;
// if (process.env.NETWORK === 'hardhat') {
//   CHAIN = {
//     ...hardhat,
//     contracts: {
//       multicall3: {
//         address: process.env.MULTICALL_3_CONTRACT_ADDRESS,
//       } as any,
//     },
//   };
// }

const network = getSubsquidNetwork();

export const wagmiConfig = getDefaultConfig({
  appName: `Subsquid Network ${upperFirst(network)}`,
  projectId: process.env.WALLET_CONNECT_PROJECT_ID || '',
  chains:
    network === NetworkName.Mainnet
      ? [
          {
            ...arbitrum,
            rpcUrls: {
              default: {
                http: ['https://arbitrum-one.public.blastapi.io'],
                webSocket: ['wss://arbitrum-one.public.blastapi.io'],
              },
            },
          },
        ]
      : [
          {
            ...arbitrumSepolia,
            rpcUrls: {
              default: {
                http: ['https://arbitrum-sepolia.public.blastapi.io'],
                webSocket: ['wss://arbitrum-sepolia.public.blastapi.io'],
              },
            },
          },
        ],
});
