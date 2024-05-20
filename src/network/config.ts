import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia, arbitrum } from 'wagmi/chains';

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

export const wagmiConfig = getDefaultConfig({
  appName: 'Subsquid Network',
  projectId: process.env.WALLET_CONNECT_PROJECT_ID || '',
  chains: [
    {
      ...arbitrumSepolia,
      rpcUrls: {
        default: {
          http: ['https://arbitrum-sepolia.public.blastapi.io'],
          webSocket: ['wss://arbitrum-sepolia.public.blastapi.io'],
        },
      },
    },
    {
      ...arbitrum,
      rpcUrls: {
        default: {
          http: ['https://arbitrum-one.public.blastapi.io'],
          webSocket: ['wss://arbitrum-one.public.blastapi.io'],
        },
      },
    },
  ],
});
