import { NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork';

export function useSquidDataSource() {
  const { network } = useSubsquidNetwork();

  return {
    endpoint:
      network === NetworkName.Testnet
        ? process.env.TESTNET_SQUID_API_URL || '/graphql'
        : process.env.MAINNET_SQUID_API_URL || '/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  };
}
