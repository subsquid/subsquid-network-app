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
  chains: [arbitrumSepolia, arbitrum],
});
