import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { upperFirst } from 'lodash-es';
import { arbitrumSepolia, arbitrum, sepolia, mainnet } from 'wagmi/chains';

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
const isProduction = process.env.NODE_ENV === 'production';

export const rainbowConfig = getDefaultConfig({
  appName: `Subsquid Network ${upperFirst(network)}`,
  projectId: process.env.WALLET_CONNECT_PROJECT_ID || '',
  chains:
    network === NetworkName.Mainnet
      ? [
          isProduction
            ? {
                ...arbitrum,
                rpcUrls: { default: { http: [`${window.location.origin}/rpc/arbitrum-one`] } },
              }
            : arbitrum,
          isProduction
            ? {
                ...mainnet,
                rpcUrls: { default: { http: [`${window.location.origin}/rpc/ethereum`] } },
              }
            : mainnet,
        ]
      : [arbitrumSepolia, sepolia],
  // transports: [fallback([unstable_connector(injected), http()])],
  syncConnectedChain: true,
});
