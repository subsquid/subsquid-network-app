import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { arbitrumSepolia, arbitrum } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

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

const privateNode = process.env.BLOCK_CHAIN_NODE_ADDRESS;

const {
  chains: configuredChains,
  publicClient,
  webSocketPublicClient,
} = configureChains(
  [arbitrumSepolia, arbitrum],
  [
    privateNode
      ? jsonRpcProvider({
          rpc: () => ({
            http: privateNode,
          }),
        })
      : publicProvider(),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      walletConnectWallet({
        projectId: process.env.WALLET_CONNECT_PROJECT_ID || '',
        chains: configuredChains,
      }),
      metaMaskWallet({
        projectId: process.env.WALLET_CONNECT_PROJECT_ID || '',
        chains: configuredChains,
      }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
  webSocketPublicClient,
});

export const chains = configuredChains;
