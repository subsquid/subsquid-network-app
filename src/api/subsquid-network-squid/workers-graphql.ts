import { useMemo } from 'react';

import { calculateDelegationCapacity } from '@lib/network';
import BigNumber from 'bignumber.js';
import { groupBy, mapValues, values } from 'lodash-es';

import { useAccount } from '@network/useAccount.ts';

import { useSquidDataSource } from './datasource';
import {
  AccountType,
  ClaimType,
  useAllWorkersQuery,
  useMyClaimsAvailableQuery,
  useMyDelegationsQuery,
  useMyWorkersCountQuery,
  useMyWorkersQuery,
  useWorkerByPeerIdQuery,
  useWorkerDaysUptimeByIdQuery,
  useWorkerRewardStatsQuery,
  WorkerFragmentFragment,
  WorkerFullFragmentFragment,
  WorkerStatus,
} from './graphql';
import { useNetworkSettings } from './settings-graphql';

// inherit API interface for internal class
export interface BlockchainApiWorker extends Omit<WorkerFragmentFragment, 'createdAt'> {
  createdAt: Date;
}

export class BlockchainApiWorker {
  ownedByMe?: boolean;
  delegationCapacity?: number;
  delegationEnabled: boolean = false;
  myDelegations: {
    owner: { id: string; type: AccountType };
    deposit: string;
    locked?: boolean;
    claimableReward: string;
    claimedReward: string;
  }[] = [];
  totalReward: string;
  // myDelegationsTotal: BigNumber;
  // myDelegationsRewardsTotal: BigNumber;

  constructor({ worker, address }: { worker: WorkerFragmentFragment; address?: `0x${string}` }) {
    Object.assign(this, {
      ...worker,
      createdAt: new Date(worker.createdAt),
      delegationEnabled: worker.status === WorkerStatus.Active,
      ownedByMe: worker.realOwner?.id === address,
    });

    // this.myDelegationsTotal = this.myDelegations.reduce(
    //   (t, r) => t.plus(fromSqd(r.deposit)),
    //   BigNumber(0),
    // );

    // this.myDelegationsRewardsTotal = this.myDelegations.reduce(
    //   (t, r) => t.plus(fromSqd(r.claimableReward)).plus(fromSqd(r.claimedReward)),
    //   BigNumber(0),
    // );

    this.totalReward = BigNumber(this.claimedReward).plus(this.claimableReward).toFixed(0);

    if (this.totalDelegation && this.capedDelegation) {
      this.delegationCapacity = calculateDelegationCapacity({
        capedDelegation: this.capedDelegation,
        totalDelegation: this.totalDelegation,
      });
    }
  }

  canEdit() {
    if (!this.ownedByMe) return false;

    switch (this.status) {
      case WorkerStatus.Registering:
      case WorkerStatus.Active:
        return true;
      default:
        return false;
    }
  }

  canUnregister() {
    if (!this.ownedByMe) return false;

    switch (this.status) {
      case WorkerStatus.Deregistering:
      case WorkerStatus.Deregistered:
      case WorkerStatus.Withdrawn:
        return false;
      default:
        return true;
    }
  }

  canWithdraw() {
    return this.status === WorkerStatus.Deregistered && !this.locked;
  }

  displayStats() {
    switch (this.status) {
      case WorkerStatus.Registering:
      case WorkerStatus.Active:
      case WorkerStatus.Deregistering:
        return true;
      default:
        return false;
    }
  }
}

// inherit API interface for internal class
export interface BlockchainApiFullWorker extends BlockchainApiWorker, WorkerFullFragmentFragment {
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
  const dataSource = useSquidDataSource();
  const { address } = useAccount();
  const { isPending: isSettingsLoading } = useNetworkSettings();

  const { data, isPending } = useAllWorkersQuery(dataSource, {});

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
        });
      })
      .sort((a, b) => {
        if (sortDir === SortDir.Desc) {
          [a, b] = [b, a];
        }

        switch (sortBy) {
          case WorkerSortBy.Uptime90d:
            return (a.uptime90Days ?? -1) - (b.uptime90Days ?? -1);
          case WorkerSortBy.Uptime24h:
            return (a.uptime24Hours ?? -1) - (b.uptime24Hours ?? -1);
          case WorkerSortBy.DelegationCapacity:
            return (a.delegationCapacity ?? -1) - (b.delegationCapacity ?? -1);
          case WorkerSortBy.StakerAPR:
            return (
              (a.stakerApr ?? -1) - (b.stakerApr ?? -1) || a.delegationCount - b.delegationCount
            );
          case WorkerSortBy.WorkerAPR:
            return (a.apr ?? -1) - (b.apr ?? -1);
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
  }, [data?.workers, search, sortBy, sortDir, address, page, perPage]);

  return {
    ...filteredData,
    isLoading: isSettingsLoading || isPending,
  };
}

export function useMyWorkers() {
  const datasource = useSquidDataSource();
  const { address } = useAccount();
  const { isPending: isSettingsLoading } = useNetworkSettings();

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
  const { isPending: isSettingsLoading } = useNetworkSettings();

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
      hasClaimsAvailable: allWorkers.some(w => BigInt(w.claimableReward) > 0),
      currentSourceTotalClaimsAvailable: filteredWorkers.reduce(
        (t, i) => t.plus(i.claimableReward),
        BigNumber(0),
      ),
      sources: values(
        mapValues(groupBy(allWorkers, 'owner.id'), g => {
          const total = g.reduce((t, i) => t.plus(i.claimableReward), BigNumber(0));

          return {
            ...g[0].owner,
            balance: total.toFixed(0),
          };
        }),
      ),

      claims: values(
        mapValues(groupBy(filteredWorkers, 'id'), g => {
          const total = g.reduce((t, i) => t.plus(i.claimableReward), BigNumber(0));

          return {
            ...g[0],
            claimableReward: total.toFixed(0),
          };
        }),
      ),
    };
  }, [data?.delegations, data?.workers, source]);

  return {
    isLoading,
    hasClaimsAvailable,
    currentSourceTotalClaimsAvailable,
    sources,
    claims,
  };
}

// type ArrayElement<ArrayType extends readonly unknown[]> =
//   ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// type Delegation = {
//   worker: BlockchainApiWorker;
//   totalReward: any;
//   delegations: Omit<ArrayElement<MyDelegationsQuery['delegations']>, 'worker'>[];
// };

export function useMyDelegations() {
  const { address } = useAccount();
  const { isPending: isSettingsLoading } = useNetworkSettings();
  const datasource = useSquidDataSource();

  const { data, isLoading } = useMyDelegationsQuery(datasource, {
    address: address || '',
  });

  const delegations: BlockchainApiWorker[] = useMemo(() => {
    const workers: Map<string, BlockchainApiWorker> = new Map();
    for (const d of data?.delegations || []) {
      let worker = workers.get(d.worker.id);
      if (!worker) {
        worker = new BlockchainApiWorker({ worker: d.worker });
        worker.myDelegations = [];
        workers.set(worker.id, worker);
      }
      worker.myDelegations.push(d);
    }
    return [...workers.values()];
  }, [data?.delegations]);

  return {
    isLoading: isSettingsLoading || isLoading,
    delegations,
  };
}

export function useIsWorkerOperator() {
  const { address } = useAccount();
  const datasource = useSquidDataSource();
  const { data, isLoading } = useMyWorkersCountQuery(
    datasource,
    {
      address: address || '',
    },
    {
      select: res => {
        return !!res.workersConnection.totalCount;
      },
    },
  );

  return {
    isLoading: isLoading,
    isWorkerOperator: data ?? false,
  };
}

export function useWorkerRewardStats(workerId?: string) {
  const datasource = useSquidDataSource();
  const { data, isLoading } = useWorkerRewardStatsQuery(
    datasource,
    {
      workerId: workerId || '',
    },
    {
      select: res => {
        return {
          ...res.workerById,
          ...res.statistics[0],
        };
      },
    },
  );

  return {
    isLoading: isLoading,
    data,
  };
}
