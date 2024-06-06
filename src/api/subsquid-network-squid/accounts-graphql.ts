import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

import { useAccount } from '@network/useAccount';

import { useSquidDataSource } from './datasource';
import {
  AccountType,
  useAccountQuery,
  useMyAssetsQuery,
  useVestingByAddressQuery,
  VestingFragmentFragment,
} from './graphql';

export type SourceWallet = {
  id: string;
  type: AccountType;
};

export type SourceWalletWithBalance = SourceWallet & {
  balance: string;
};

export function useMySources({ enabled }: { enabled?: boolean } = {}) {
  const datasource = useSquidDataSource();
  const { address } = useAccount();
  const requestEnabled = enabled && !!address;
  const { data: data, isPending } = useAccountQuery(
    datasource,
    {
      address: address || '',
    },
    {
      enabled: requestEnabled,
    },
  );

  const wallet = data?.accountById;

  const res = useMemo((): SourceWalletWithBalance[] => {
    return !wallet
      ? [
          {
            type: AccountType.User,
            id: address as string,
            balance: '0',
          },
        ]
      : [wallet, ...wallet.owned].map(a => ({
          type: a.type,
          id: a.id,
          balance: a.balance,
        }));
  }, [address, wallet]);

  const vestingContracts = useMemo(() => {
    return res.filter(a => a.type === AccountType.Vesting);
  }, [res]);

  return {
    sources: res,
    vestingContracts,
    isPending,
  };
}

export function useMyAssets() {
  const datasource = useSquidDataSource();
  const { address } = useAccount();

  const enabled = !!address;
  const { data, isLoading } = useMyAssetsQuery(
    datasource,
    {
      address: address || '',
    },
    { enabled },
  );

  const assets = useMemo(() => {
    const accounts = data?.accounts || [];
    const delegations = data?.delegations || [];
    const workers = data?.workers || [];

    let balance = BigNumber(0);
    let locked = BigNumber(0);
    let bonded = BigNumber(0);
    let claimable = BigNumber(0);
    let delegated = BigNumber(0);
    const vestings: SourceWalletWithBalance[] = [];

    for (const a of accounts) {
      balance = balance.plus(a.balance);

      for (const o of a.owned) {
        locked = locked.plus(o.balance);
        vestings.push({
          id: o.id,
          type: AccountType.Vesting,
          balance: BigNumber(o.balance).toFixed(0),
        });
      }
    }
    for (const w of workers) {
      bonded = bonded.plus(w.bond);
      claimable = claimable.plus(w.claimableReward);
    }
    for (const d of delegations) {
      claimable = claimable.plus(d.claimableReward);
      delegated = delegated.plus(d.deposit);
    }

    return {
      balance: balance.toFixed(0),
      locked: locked.toFixed(0),
      bonded: bonded.toFixed(0),
      claimable: claimable.toFixed(0),
      delegated: delegated.toFixed(0),
      vestings,
      total: balance.plus(locked).plus(bonded).plus(claimable).plus(delegated).toFixed(0),
    };
  }, [data]);

  return {
    assets,
    isLoading,
  };
}

export interface BlockchainApiVesting extends VestingFragmentFragment {}

export class BlockchainApiVesting {
  constructor(
    vesting: VestingFragmentFragment,
    private address?: string,
  ) {
    Object.assign(this, vesting);
  }

  isOwn() {
    return this.owner?.id === this.address?.toLowerCase();
  }
}

export function useVestingByAddress({ address }: { address?: string }) {
  const datasource = useSquidDataSource();
  const account = useAccount();

  const { data, isPending } = useVestingByAddressQuery(
    datasource,
    {
      address: address?.toLowerCase() || '',
    },
    {
      select: res => {
        if (!res.accountById) return undefined;
        if (res.accountById.type !== AccountType.Vesting) return undefined;

        return new BlockchainApiVesting(res.accountById, account.address);
      },
      enabled: !!address,
    },
  );

  return {
    data,
    isPending,
  };
}
