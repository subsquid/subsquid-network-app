import { useSquidDataSource } from '@api/subsquid-network-squid/datasource';
import { useAccount } from '@network/useAccount';

import {
  GatewayFragmentFragment,
  useGatewayByPeerIdQuery,
  useMyGatewaysQuery,
  useMyGatewayStakesQuery,
} from './graphql';

// inherit API interface for internal class
export interface BlockchainGateway extends GatewayFragmentFragment {
  owner: Exclude<GatewayFragmentFragment['owner'], undefined>;
}

export class BlockchainGateway {
  ownedByMe?: boolean;

  constructor({ gateway, address }: { gateway: GatewayFragmentFragment; address?: `0x${string}` }) {
    Object.assign(this, {
      ...gateway,
      createdAt: new Date(),
      ownedByMe: gateway?.owner?.id === address,
    });
  }
}

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
        return res.gateways.map(
          gateway =>
            new BlockchainGateway({
              gateway,
              address,
            }),
        );
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
  const { address } = useAccount();
  const enabled = !!peerId;

  const { data, isLoading } = useGatewayByPeerIdQuery(
    datasource,
    {
      peerId: peerId || '',
    },
    {
      select: res => {
        if (!res.gatewayById) return;

        return new BlockchainGateway({
          gateway: res.gatewayById,
          address,
        });
      },
      enabled,
    },
  );

  return {
    data,
    isLoading: enabled ? isLoading : false,
  };
}

export function useMyGatewayStakes() {
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
        return res.gatewayOperators[0];
      },
      enabled,
    },
  );

  return {
    data: data,
    isLoading: enabled && isLoading,
  };
}
