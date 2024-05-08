import { useMemo } from 'react';

import Decimal from 'decimal.js';

import { formatSqd } from '@api/contracts/utils';
import { useAccount } from '@network/useAccount';

import { useSquidDataSource } from './datasource';
import { AccountType, useAccountQuery, useMyAssetsQuery } from './graphql';

export type SourceWallet = {
  id: string;
  type: AccountType;
  balance: string;
  balanceFormatted: string;
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

  const res = useMemo((): SourceWallet[] => {
    return !wallet
      ? [
          {
            type: AccountType.User,
            id: address as string,
            balance: '0',
            balanceFormatted: '0',
          },
        ]
      : [wallet, ...wallet.owned].map(a => ({
          type: a.type,
          id: a.id,
          balance: a.balance as string,
          balanceFormatted: formatSqd(a.balance),
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

    let balance = new Decimal(0);
    let locked = new Decimal(0);
    let bonded = new Decimal(0);
    let claimable = new Decimal(0);
    let delegated = new Decimal(0);
    const vestings: { address: string; balance: string }[] = [];

    for (const a of accounts) {
      balance = balance.add(a.balance);

      for (const o of a.owned) {
        locked = locked.add(o.balance);
        vestings.push({ address: o.id, balance: new Decimal(o.balance).toFixed(0) });
      }
    }
    for (const w of workers) {
      bonded = bonded.add(w.bond);
      claimable = claimable.add(w.claimableReward);
    }
    for (const d of delegations) {
      claimable = claimable.add(d.claimableReward);
      delegated = delegated.add(d.deposit);
    }

    return {
      balance: balance.toFixed(0),
      locked: locked.toFixed(0),
      bonded: bonded.toFixed(0),
      claimable: claimable.toFixed(0),
      delegated: delegated.toFixed(0),
      vestings,
      total: balance.add(locked).add(bonded).add(claimable).add(delegated).toFixed(0),
    };
  }, [data]);

  return {
    assets,
    isLoading,
  };
}
