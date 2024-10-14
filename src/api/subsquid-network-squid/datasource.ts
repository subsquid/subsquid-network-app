import { NetworkName, getSubsquidNetwork } from '@network/useSubsquidNetwork';

export function useSquid() {
  const network = getSubsquidNetwork();

  return {
    endpoint:
      network === NetworkName.Tethys
        ? process.env.TESTNET_SQUID_API_URL || '/graphql'
        : process.env.MAINNET_SQUID_API_URL || '/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  };
}
