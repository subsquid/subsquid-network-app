import { useMemo } from 'react';

import { UseQueryOptions } from '@tanstack/react-query';

import { useAccount } from '@network/useAccount';

import { useSquid } from './datasource';
import {
  AccountType,
  useSourcesQuery,
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

export function useMySources<TData = SourceWalletWithBalance[]>({
  enabled,
  select = data => data as TData,
}: {
  enabled?: boolean;
  select?: UseQueryOptions<SourceWalletWithBalance[], unknown, TData>['select'];
} = {}) {
  const squid = useSquid();
  const { address } = useAccount();

  const { data: sourcesQuery, isLoading } = useSourcesQuery(
    squid,
    { address: address || '0x' },
    { enabled },
  );

  const data: SourceWalletWithBalance[] = useMemo(
    () =>
      !sourcesQuery?.accounts?.length
        ? [
            {
              id: address || '0x',
              type: AccountType.User,
              balance: '0',
            },
          ]
        : sourcesQuery?.accounts,
    [address, sourcesQuery?.accounts],
  );

  const tData: TData = useMemo(() => select(data), [data, select]);

  return {
    data: tData,
    isLoading,
  };
}

// export function useMyAssets() {
//   const datasource = useSquid();
//   const { address } = useAccount();

//   const enabled = !!address;
//   const { data, isLoading } = useMyAssetsQuery(
//     datasource,
//     {
//       address: address || '',
//     },
//     { enabled },
//   );

//   const assets = useMemo(() => {
//     const accounts = data?.accounts || [];
//     const delegations = data?.delegations || [];
//     const workers = data?.workers || [];

//     let balance = BigNumber(0);
//     let locked = BigNumber(0);
//     let bonded = BigNumber(0);
//     let claimable = BigNumber(0);
//     let delegated = BigNumber(0);
//     const vestings: SourceWalletWithBalance[] = [];

//     for (const a of accounts) {
//       balance = balance.plus(a.balance);

//       for (const o of a.owned) {
//         locked = locked.plus(o.balance);
//         vestings.push({
//           id: o.id,
//           type: AccountType.Vesting,
//           balance: BigNumber(o.balance).toFixed(0),
//         });
//       }
//     }
//     for (const w of workers) {
//       bonded = bonded.plus(w.bond);
//       claimable = claimable.plus(w.claimableReward);
//     }
//     for (const d of delegations) {
//       claimable = claimable.plus(d.claimableReward);
//       delegated = delegated.plus(d.deposit);
//     }

//     return {
//       balance: balance.toFixed(0),
//       locked: locked.toFixed(0),
//       bonded: bonded.toFixed(0),
//       claimable: claimable.toFixed(0),
//       delegated: delegated.toFixed(0),
//       vestings,
//       total: balance.plus(locked).plus(bonded).plus(claimable).plus(delegated).toFixed(0),
//     };
//   }, [data]);

//   return {
//     assets,
//     isLoading,
//   };
// }

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
  const datasource = useSquid();
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
