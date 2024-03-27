import { SQUID_DATASOURCE } from '@api/subsquid-network-squid/datasource';
import { useAccount } from '@network/useAccount';

import { GatewayFragmentFragment, useGatewayByPeerIdQuery, useMyGatewaysQuery } from './graphql';

// inherit API interface for internal class
export interface BlockchainGateway extends GatewayFragmentFragment {
  owner: Exclude<GatewayFragmentFragment['owner'], undefined>;
}

export class BlockchainGateway {
  ownedByMe?: boolean;
  totalStaked: string = '0';
  pendingStaked: string = '0';

  constructor({ gateway, address }: { gateway: GatewayFragmentFragment; address?: `0x${string}` }) {
    Object.assign(this, {
      ...gateway,
      totalStaked: String(gateway.operator?.stake?.amount || 0),
      pendingStaked: String(gateway.operator?.pendingStake?.amount || 0),
      createdAt: new Date(),
      ownedByMe: gateway?.owner?.id === address,
    });
  }
}

export function useMyGateways() {
  const { address } = useAccount();

  const enabled = !!address;
  const { data, isLoading } = useMyGatewaysQuery(
    SQUID_DATASOURCE,
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
  const { address } = useAccount();
  const enabled = !!peerId;

  const { data, isLoading } = useGatewayByPeerIdQuery(
    SQUID_DATASOURCE,
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
