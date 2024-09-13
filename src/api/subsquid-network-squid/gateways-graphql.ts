import { useSquidDataSource } from '@api/subsquid-network-squid/datasource';
import { useAccount } from '@network/useAccount';

import { useGatewayByPeerIdQuery, useMyGatewaysQuery, useMyGatewayStakesQuery } from './graphql';

// inherit API interface for internal class
// export interface BlockchainGateway extends GatewayFragmentFragment {
//   owner: Exclude<GatewayFragmentFragment['owner'], undefined>;
// }

// export class BlockchainGateway {
//   ownedByMe?: boolean;

//   constructor({ gateway, address }: { gateway: GatewayFragmentFragment; address?: `0x${string}` }) {
//     Object.assign(this, {
//       ...gateway,
//       createdAt: new Date(),
//       ownedByMe: gateway?.owner?.id === address,
//     });
//   }
// }

export function useMyGateways() {
  const datasource = useSquidDataSource();
  const { address } = useAccount();

  const enabled = !!address;
  const { data, isLoading } = useMyGatewaysQuery(
    datasource,
    {
      address: address || '',
    },
    {
      select: res => {
        return res.gateways;
      },
      enabled,
    },
  );

  return {
    data: data || [],
    isLoading: enabled ? isLoading : false,
  };
}

export function useGatewayByPeerId(peerId?: string) {
  const datasource = useSquidDataSource();
  const enabled = !!peerId;

  const { data, isLoading } = useGatewayByPeerIdQuery(
    datasource,
    {
      peerId: peerId || '',
    },
    {
      select: res => {
        if (!res.gatewayById) return;

        return res.gatewayById;
      },
      enabled,
    },
  );

  return {
    data,
    isLoading: enabled ? isLoading : false,
  };
}

export function useMyGatewayStake() {
  const datasource = useSquidDataSource();
  const { address } = useAccount();

  const enabled = !!address;
  const { data, isLoading } = useMyGatewayStakesQuery(
    datasource,
    {
      address: address || '',
    },
    {
      select: res => {
        return {
          stake: res.gatewayStakes.length ? res.gatewayStakes[0] : undefined,
          ...res.networkStats,
        };
      },
      enabled,
    },
  );

  return {
    data: data,
    isLoading: enabled && isLoading,
  };
}
