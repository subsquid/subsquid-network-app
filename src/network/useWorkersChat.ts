import { NetworkName, getSubsquidNetwork } from './useSubsquidNetwork';

export function useWorkersChatUrl(): string | undefined {
  const network = getSubsquidNetwork();

  switch (network) {
    case NetworkName.Testnet: {
      return process.env.TESTNET_WORKERS_CHAT_URL;
    }
    case NetworkName.Mainnet: {
      return process.env.MAINNET_WORKERS_CHAT_URL;
    }
  }
}
