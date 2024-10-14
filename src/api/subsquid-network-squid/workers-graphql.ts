import { useMemo } from 'react';

import { calculateDelegationCapacity } from '@lib/network';
import BigNumber from 'bignumber.js';
import { compare as compareSemver } from 'semver';
import { PartialDeep, SimplifyDeep } from 'type-fest';

import { useAccount } from '@network/useAccount.ts';

import { useSquid } from './datasource';
import {
  AccountType,
  Delegation,
  useAllWorkersQuery,
  useMyDelegationsQuery,
  useMyWorkersCountQuery,
  useMyWorkersQuery,
  useWorkerByPeerIdQuery,
  useWorkerDelegationInfoQuery,
  useWorkerOwnerQuery,
  Worker,
} from './graphql';
import { useNetworkSettings } from './settings-graphql';

// inherit API interface for internal class
// export interface BlockchainApiWorker extends Omit<WorkerFragmentFragment, 'createdAt'> {
//   createdAt: Date;
// }

// export class BlockchainApiWorker {
//   ownedByMe?: boolean;
//   delegationCapacity?: number;
//   delegationEnabled: boolean = false;
//   myDelegations: {
//     owner: { id: string; type: AccountType };
//     deposit: string;
//     locked?: boolean;
//     claimableReward: string;
//     claimedReward: string;
//   }[] = [];
//   totalReward: string;
//   // myDelegationsTotal: BigNumber;
//   // myDelegationsRewardsTotal: BigNumber;

//   constructor({ worker, address }: { worker: WorkerFragmentFragment; address?: `0x${string}` }) {
//     Object.assign(this, {
//       ...worker,
//       createdAt: new Date(worker.createdAt),
//       delegationEnabled: worker.status === WorkerStatus.Active,
//       ownedByMe: worker.realOwner?.id === address,
//     });

//     // this.myDelegationsTotal = this.myDelegations.reduce(
//     //   (t, r) => t.plus(fromSqd(r.deposit)),
//     //   BigNumber(0),
//     // );

//     // this.myDelegationsRewardsTotal = this.myDelegations.reduce(
//     //   (t, r) => t.plus(fromSqd(r.claimableReward)).plus(fromSqd(r.claimedReward)),
//     //   BigNumber(0),
//     // );

//     this.totalReward = BigNumber(this.claimedReward).plus(this.claimableReward).toFixed(0);

//     if (this.totalDelegation && this.capedDelegation) {
//       this.delegationCapacity = calculateDelegationCapacity({
//         capedDelegation: this.capedDelegation,
//         totalDelegation: this.totalDelegation,
//       });
//     }
//   }

//   canEdit() {
//     if (!this.ownedByMe) return false;

//     switch (this.status) {
//       case WorkerStatus.Registering:
//       case WorkerStatus.Active:
//         return true;
//       default:
//         return false;
//     }
//   }

//   canUnregister() {
//     if (!this.ownedByMe) return false;

//     switch (this.status) {
//       case WorkerStatus.Deregistering:
//       case WorkerStatus.Deregistered:
//       case WorkerStatus.Withdrawn:
//         return false;
//       default:
//         return true;
//     }
//   }

//   canWithdraw() {
//     return this.status === WorkerStatus.Deregistered && !this.locked;
//   }

//   displayStats() {
//     switch (this.status) {
//       case WorkerStatus.Registering:
//       case WorkerStatus.Active:
//       case WorkerStatus.Deregistering:
//         return true;
//       default:
//         return false;
//     }
//   }
// }

// inherit API interface for internal class
// export interface BlockchainApiFullWorker extends BlockchainApiWorker, WorkerFullFragmentFragment {
//   owner: WorkerFullFragmentFragment['owner'];
// }
// export class BlockchainApiFullWorker extends BlockchainApiWorker {}

export interface WorkerExtended extends Worker {
  delegationCapacity: number;
  myDelegation: string;
  myTotalDelegationReward: string;
  totalReward: string;
}

export enum WorkerSortBy {
  JoinedAt = 'joined_at',
  Uptime24h = 'uptime_24h',
  Uptime90d = 'uptime_90d',
  StakerAPR = 'staker_apr',
  WorkerAPR = 'apr',
  WorkerReward = 'worker_reward',
  DelegationCapacity = 'delegation_capacity',
  MyDelegation = 'my_delegation',
  MyDelegationReward = 'my_delegation_reward',
  Name = 'name',
  Version = 'version',
}

export enum SortDir {
  Asc = 'asc',
  Desc = 'desc',
}

export function sortWorkers<T extends PartialDeep<WorkerExtended, { recurseIntoArrays: true }>>(
  workers: T[],
  sortBy: WorkerSortBy,
  sortDir: SortDir,
) {
  return workers.sort((a, b) => {
    if (sortDir === SortDir.Desc) {
      [a, b] = [b, a];
    }

    switch (sortBy) {
      case WorkerSortBy.Name:
        return a.name ? (b.name ? a.name.localeCompare(b.name) : -1) : 1;
      case WorkerSortBy.Uptime90d:
        return (a.uptime90Days ?? -1) - (b.uptime90Days ?? -1);
      case WorkerSortBy.Uptime24h:
        return (a.uptime24Hours ?? -1) - (b.uptime24Hours ?? -1);
      case WorkerSortBy.DelegationCapacity:
        return (a.delegationCapacity ?? -1) - (b.delegationCapacity ?? -1);
      case WorkerSortBy.StakerAPR:
        return (a.stakerApr ?? -1) - (b.stakerApr ?? -1);
      case WorkerSortBy.WorkerAPR:
        return (a.apr ?? -1) - (b.apr ?? -1);
      case WorkerSortBy.WorkerReward:
        return BigInt(a.totalReward ?? -1) > BigInt(b.totalReward ?? -1) ? 1 : -1;
      case WorkerSortBy.MyDelegation:
        return BigInt(a.myDelegation ?? -1) > BigInt(b.myDelegation ?? -1) ? 1 : -1;
      case WorkerSortBy.MyDelegationReward:
        return BigInt(a.myTotalDelegationReward ?? -1) > BigInt(b.myTotalDelegationReward ?? -1)
          ? 1
          : -1;
      case WorkerSortBy.Version:
        return a.version ? (b.version ? compareSemver(a.version, b.version) : 1) : -1;
      default:
        return new Date(a.createdAt || 0).valueOf() - new Date(b.createdAt || 0).valueOf();
    }
  });
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
  const dataSource = useSquid();
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
      .map(w => {
        return {
          ...w,
          delegationCapacity: calculateDelegationCapacity({
            totalDelegation: w.totalDelegation,
            capedDelegation: w.capedDelegation,
          }),
        };
      });

    const totalPages = Math.ceil(filtered.length / perPage);
    const normalizedPage = Math.min(Math.max(1, page), totalPages);

    return {
      page: normalizedPage,
      totalPages: Math.floor(filtered.length / perPage),
      workers: sortWorkers(filtered, sortBy, sortDir).slice(
        (normalizedPage - 1) * perPage,
        normalizedPage * perPage,
      ),
    };
  }, [data?.workers, search, sortBy, sortDir, page, perPage]);

  return {
    ...filteredData,
    isLoading: isSettingsLoading || isPending,
  };
}

export function useMyWorkers({ sortBy, sortDir }: { sortBy: WorkerSortBy; sortDir: SortDir }) {
  const datasource = useSquid();
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
        return res.workers.map(w => {
          return {
            ...w,
            totalReward: BigNumber(w.claimedReward).plus(w.claimableReward).toFixed(),
          };
        });
      },
      enabled,
    },
  );

  const workers = useMemo(() => {
    return sortWorkers(data || [], sortBy, sortDir);
  }, [data, sortBy, sortDir]);

  return {
    data: workers,
    isLoading: enabled ? isSettingsLoading || isLoading : false,
  };
}

export function useWorkerByPeerId(peerId?: string) {
  const datasource = useSquid();
  const enabled = !!peerId;
  const { isPending: isSettingsLoading } = useNetworkSettings();
  const { address } = useAccount();

  const { data, isPending } = useWorkerByPeerIdQuery(
    datasource,
    { peerId: peerId || '', address },
    {
      select: res => {
        if (!res.workers.length) return;
        return res.workers.map(w => {
          return {
            ...w,
            delegationCapacity: calculateDelegationCapacity({
              totalDelegation: w.totalDelegation,
              capedDelegation: w.capedDelegation,
            }),
          };
        })[0];
      },
      enabled,
    },
  );

  return {
    data,
    isPending: enabled ? isSettingsLoading || isPending : false,
  };
}

// export function useMyClaimsAvailable() {
//   const { address } = useAccount();
//   const datasource = useSquidDataSource();

//   const { data, isLoading } = useMyClaimsQuery(datasource, {
//     address: address || '',
//   });

//   const { sources, claims } = useMemo(() => {
//     const allWorkers = [
//       ...(data?.workers || []).map(w => ({
//         ...w,
//         type: ClaimType.Worker,
//       })),
//       ...(data?.delegations || []).map(d => {
//         return {
//           ...d.worker,
//           type: ClaimType.Delegation,
//           owner: d.owner,
//           claimableReward: d.claimableReward,
//         };
//       }),
//     ];

//     const filteredWorkers = source ? allWorkers.filter(w => w.owner.id === source) : allWorkers;

//     return {
//       sources: values(
//         mapValues(groupBy(allWorkers, 'owner.id'), g => {
//           const total = g.reduce((t, i) => t.plus(i.claimableReward), BigNumber(0));

//           return {
//             ...g[0].owner,
//             balance: total.toFixed(0),
//           };
//         }),
//       ),

//       claims: values(
//         mapValues(groupBy(filteredWorkers, 'id'), g => {
//           const total = g.reduce((t, i) => t.plus(i.claimableReward), BigNumber(0));

//           return {
//             ...g[0],
//             claimableReward: total.toFixed(0),
//           };
//         }),
//       ),
//     };
//   }, [data?.delegations, data?.workers, source]);

//   return {
//     isLoading,
//     sources,
//     claims,
//   };
// }

export function useMyDelegations({ sortBy, sortDir }: { sortBy: WorkerSortBy; sortDir: SortDir }) {
  const { address } = useAccount();
  const { isPending: isSettingsLoading } = useNetworkSettings();
  const datasource = useSquid();

  const { data: delegationsQuery, isLoading: isDelegationsQueryLoading } = useMyDelegationsQuery(
    datasource,
    { address: address || '0x' },
  );

  const data = useMemo(() => {
    type W = SimplifyDeep<
      Pick<
        Worker,
        | 'id'
        | 'peerId'
        | 'name'
        | 'capedDelegation'
        | 'totalDelegation'
        | 'online'
        | 'jailed'
        | 'status'
        | 'stakerApr'
      > &
        Pick<WorkerExtended, 'delegationCapacity' | 'myDelegation' | 'myTotalDelegationReward'> & {
          delegations: (Pick<Delegation, 'deposit' | 'locked'> & {
            owner: { id: string; type: AccountType };
          })[];
        }
    >;

    const workers = delegationsQuery?.workers.map(w => {
      const worker: W = {
        id: w.id,
        name: w.name,
        peerId: w.peerId,
        status: w.status,
        online: w.online,
        jailed: w.jailed,
        stakerApr: w.stakerApr,
        totalDelegation: w.totalDelegation,
        capedDelegation: w.capedDelegation,
        delegationCapacity: calculateDelegationCapacity({
          totalDelegation: w.totalDelegation,
          capedDelegation: w.capedDelegation,
        }),
        myDelegation: '0',
        myTotalDelegationReward: '0',
        delegations: [],
      };

      w.delegations.forEach(d => {
        worker.myDelegation = BigNumber(worker.myDelegation).plus(d.deposit).toFixed();
        worker.myTotalDelegationReward = BigNumber(worker.myTotalDelegationReward)
          .plus(d.claimableReward)
          .plus(d.claimedReward)
          .toFixed();

        worker.delegations.push({
          deposit: d.deposit,
          locked: d.locked,
          owner: {
            id: d.owner.id,
            type: d.owner.type,
          },
        });
      });

      return worker;
    });

    return sortWorkers(workers || [], sortBy, sortDir);
  }, [delegationsQuery?.workers, sortBy, sortDir]);

  return {
    isLoading: isSettingsLoading || isDelegationsQueryLoading,
    data,
  };
}

export function useIsWorkerOperator() {
  const { address } = useAccount();
  const datasource = useSquid();
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

export function useWorkerDelegationInfo({
  workerId,
  enabled,
}: {
  workerId?: string;
  enabled?: boolean;
}) {
  const datasource = useSquid();
  const { data, isLoading } = useWorkerDelegationInfoQuery(
    datasource,
    {
      workerId: workerId || '',
    },
    {
      select: res => {
        return {
          worker: res.workerById,
          info: res.statistics[0],
        };
      },
      enabled,
    },
  );

  return {
    isLoading: isLoading,
    data,
  };
}

export function useWorkerOwner({ workerId, enabled }: { workerId?: string; enabled?: boolean }) {
  const datasource = useSquid();
  const { data, isLoading } = useWorkerOwnerQuery(
    datasource,
    {
      workerId: workerId || '',
    },
    {
      select: res => {
        return res.workerById;
      },
      enabled,
    },
  );

  return {
    isLoading: isLoading,
    data,
  };
}

export function useMyWorkerDelegations({
  peerId,
  enabled,
}: {
  peerId?: string;
  enabled?: boolean;
}) {
  const { address } = useAccount();
  const datasource = useSquid();
  const { data, isLoading } = useMyDelegationsQuery(
    datasource,
    {
      workerId: peerId || '',
      address: address || '',
    },
    {
      select: res => {
        return res.workers[0]?.delegations || [];
      },
      enabled,
    },
  );

  return {
    isLoading: isLoading,
    data,
  };
}
