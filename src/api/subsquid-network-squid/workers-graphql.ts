import { useMemo } from 'react';

import Decimal from 'decimal.js';
import { groupBy, mapValues, values } from 'lodash-es';

import { formatSqd, fromSqd, humanReadableSqd } from '@api/contracts/utils';
import { useAccount } from '@network/useAccount.ts';
import { useContracts } from '@network/useContracts';

import { useSquidDataSource } from './datasource';
import {
  AccountType,
  ClaimType,
  MyDelegationsQuery,
  useAllWorkersQuery,
  useMyClaimsAvailableQuery,
  useMyDelegationsQuery,
  useMyWorkersQuery,
  useWorkerByPeerIdQuery,
  useWorkerDaysUptimeByIdQuery,
  WorkerFragmentFragment,
  WorkerFullFragmentFragment,
  WorkerStatus,
} from './graphql';
import { useNetworkSettings } from './settings-graphql';

// inherit API interface for internal class
export interface BlockchainApiWorker extends WorkerFragmentFragment {}

export class BlockchainApiWorker {
  ownedByMe?: boolean;
  totalDelegations: {
    limit: Decimal;
    total: Decimal;
    capacity: Decimal;
    utilizedPercent: Decimal;
  } = {
    limit: new Decimal(0),
    total: new Decimal(0),
    capacity: new Decimal(0),
    utilizedPercent: new Decimal(0),
  };
  delegationEnabled: boolean = false;
  myDelegations: { owner: { id: string; type: AccountType }; deposit: string; locked: boolean }[] =
    [];
  myDelegationsTotal: Decimal;
  totalReward: Decimal;

  constructor({
    worker,
    delegationLimit,
    address,
  }: {
    worker: WorkerFragmentFragment;
    delegationLimit: Decimal;
    address?: `0x${string}`;
  }) {
    const totalDelegation = fromSqd(worker.totalDelegation);
    const capacity = delegationLimit.minus(totalDelegation);

    Object.assign(this, {
      ...worker,
      createdAt: new Date(worker.createdAt),
      totalDelegations: {
        limit: delegationLimit,
        total: totalDelegation,
        capacity,
        utilizedPercent: totalDelegation.div(delegationLimit).mul(100),
      },
      delegationEnabled: worker.status === WorkerStatus.Active,
      ownedByMe: worker.realOwner?.id === address,
    });

    this.myDelegationsTotal = this.myDelegations.reduce(
      (t, r) => t.add(fromSqd(r.deposit)),
      new Decimal(0),
    );

    this.totalReward = new Decimal(this.claimedReward).add(this.claimableReward);
  }
}

// inherit API interface for internal class
export interface BlockchainApiFullWorker
  extends WorkerFragmentFragment,
    WorkerFullFragmentFragment {
  owner: WorkerFullFragmentFragment['owner'];
}
export class BlockchainApiFullWorker extends BlockchainApiWorker {}

export enum WorkerSortBy {
  JoinedAt = 'joined_at',
  Uptime24h = 'uptime_24h',
  Uptime90d = 'uptime_90d',
  StakerAPR = 'staker_apr',
  WorkerAPR = 'apr',
  DelegationCapacity = 'delegation_capacity',
}

export enum SortDir {
  Asc = 'asc',
  Desc = 'desc',
}

export function useWorkers({
  page,
  perPage,
  search,
  sortBy,
  sortDir,
}: {
  page: number;
  perPage: number;
  search: string;
  sortBy: WorkerSortBy;
  sortDir: SortDir;
}) {
  const datasource = useSquidDataSource();
  const { address } = useAccount();
  const { isPending: isSettingsLoading, delegationLimit } = useNetworkSettings();

  const { data, isPending } = useAllWorkersQuery(datasource, {});

  const filteredData = useMemo(() => {
    const filtered = (data?.workers || [])
      .filter(w => {
        if (search) {
          const regex = new RegExp(`${search}`, 'i');

          return w.peerId.match(regex) || w.name?.match(regex);
        }

        return true;
      })
      .map(worker => {
        return new BlockchainApiWorker({
          worker,
          address,
          delegationLimit,
        });
      })
      .sort((a, b) => {
        if (sortDir === SortDir.Desc) {
          [a, b] = [b, a];
        }

        switch (sortBy) {
          case WorkerSortBy.Uptime90d:
            return (a.uptime90Days || 0) - (b.uptime90Days || 0);
          case WorkerSortBy.Uptime24h:
            return (a.uptime24Hours || 0) - (b.uptime24Hours || 0);
          case WorkerSortBy.DelegationCapacity:
            return a.totalDelegations.capacity.minus(b.totalDelegations.capacity).toNumber();
          case WorkerSortBy.StakerAPR:
            return (a.stakerApr || 0) - (b.stakerApr || 0);
          case WorkerSortBy.WorkerAPR:
            return (a.apr || 0) - (b.apr || 0);
          default:
            return a.createdAt.valueOf() - b.createdAt.valueOf();
        }
      });

    const totalPages = Math.ceil(filtered.length / perPage);
    const normalizedPage = Math.min(Math.max(1, page), totalPages);

    return {
      page: normalizedPage,
      totalPages: Math.floor(filtered.length / perPage),
      workers: filtered.slice((normalizedPage - 1) * perPage, normalizedPage * perPage),
    };
  }, [data?.workers, search, sortBy, sortDir, address, delegationLimit, page, perPage]);

  return {
    ...filteredData,
    isLoading: isSettingsLoading || isPending,
  };
}

export function useMyWorkers() {
  const datasource = useSquidDataSource();
  const { address } = useAccount();
  const { isPending: isSettingsLoading, delegationLimit } = useNetworkSettings();

  const enabled = !!address;
  const { data, isLoading } = useMyWorkersQuery(
    datasource,
    {
      address: address || '',
    },
    {
      select: res => {
        return res.workers.map(
          w =>
            new BlockchainApiWorker({
              worker: w,
              address,
              delegationLimit,
            }),
        );
      },
      enabled,
    },
  );

  return {
    data: data || [],
    isLoading: enabled ? isSettingsLoading || isLoading : false,
  };
}

export function useWorkerByPeerId(peerId?: string) {
  const datasource = useSquidDataSource();
  const enabled = !!peerId;
  const { address } = useAccount();
  const { isPending: isSettingsLoading, delegationLimit } = useNetworkSettings();

  const { data, isPending } = useWorkerByPeerIdQuery(
    datasource,
    {
      peerId: peerId || '',
      address: address || '',
    },
    {
      select: res => {
        if (!res.workers.length) return;

        return new BlockchainApiFullWorker({
          worker: res.workers[0],
          address,
          delegationLimit,
        });
      },
      enabled,
    },
  );

  return {
    data,
    isPending: enabled ? isSettingsLoading || isPending : false,
  };
}

// TODO: remove hardcoded date
export function useWorkerDaysUptimeById(workerId?: string) {
  const enabled = !!workerId;
  const datasource = useSquidDataSource();

  const { data, isLoading } = useWorkerDaysUptimeByIdQuery(
    datasource,
    {
      id: workerId || '',
      from: '2024-01-23T12:00:00.000000Z',
    },
    {
      select: res =>
        res.workerSnapshotsByDay.map(({ timestamp, uptime }) => ({
          timestamp,
          uptime,
        })),
      enabled,
    },
  );

  return {
    data: data || [],
    isLoading: enabled ? isLoading : false,
  };
}

export function useMyClaimsAvailable({ source }: { source?: string } = {}) {
  const { address } = useAccount();
  const { SQD_TOKEN } = useContracts();
  const datasource = useSquidDataSource();

  const { data, isLoading } = useMyClaimsAvailableQuery(datasource, {
    address: address || '',
  });

  const { sources, claims, hasClaimsAvailable, currentSourceTotalClaimsAvailable } = useMemo(() => {
    const allWorkers = [
      ...(data?.workers || []).map(w => ({
        ...w,
        type: ClaimType.Worker,
      })),
      ...(data?.delegations || []).map(d => {
        return {
          ...d.worker,
          type: ClaimType.Delegation,
          owner: d.owner,
          claimableReward: d.claimableReward,
        };
      }),
    ];

    const filteredWorkers = source ? allWorkers.filter(w => w.owner.id === source) : allWorkers;

    return {
      hasClaimsAvailable: allWorkers.some(w => w.claimableReward > 0),
      currentSourceTotalClaimsAvailable: filteredWorkers.reduce(
        (t, i) => t.add(i.claimableReward),
        new Decimal(0),
      ),
      sources: values(
        mapValues(groupBy(allWorkers, 'owner.id'), g => {
          const total = g.reduce((t, i) => t.add(i.claimableReward), new Decimal(0));

          return {
            ...g[0].owner,
            balance: total.toFixed(0),
            balanceFormatted: formatSqd(SQD_TOKEN, total),
          };
        }),
      ),

      claims: values(
        mapValues(groupBy(filteredWorkers, 'id'), g => {
          const total = g.reduce((t, i) => t.add(i.claimableReward), new Decimal(0));

          return {
            ...g[0],
            claimableReward: total,
            claimableRewardFormatted: humanReadableSqd(total.toFixed(0)),
          };
        }),
      ),
    };
  }, [SQD_TOKEN, data?.delegations, data?.workers, source]);

  return {
    isLoading,
    hasClaimsAvailable,
    currentSourceTotalClaimsAvailable,
    sources,
    claims,
  };
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type Delegation = ArrayElement<MyDelegationsQuery['delegations']> & {
  totalReward: any;
  worker: BlockchainApiWorker;
};

export function useMyDelegations() {
  const { address } = useAccount();
  const { isPending: isSettingsLoading, delegationLimit } = useNetworkSettings();
  const datasource = useSquidDataSource();

  const { data, isLoading } = useMyDelegationsQuery(datasource, {
    address: address || '',
  });

  const delegations: Delegation[] = useMemo(
    () =>
      (data?.delegations || []).map(d => {
        return {
          ...d,
          totalReward: new Decimal(d.claimedReward).add(d.claimableReward).toFixed(0),
          worker: new BlockchainApiWorker({
            worker: d.worker,
            address,
            delegationLimit,
          }),
        };
      }),
    [address, data?.delegations, delegationLimit],
  );

  return {
    isLoading: isSettingsLoading || isLoading,
    delegations,
  };
}
