import { useMemo } from 'react';

import { getBlockTime } from '@lib/network';
import { useBlock, useReadContracts } from 'wagmi';

import { Worker, WorkerStatus } from '@api/subsquid-network-squid';
import { useContracts } from '@network/useContracts';

import {
  useReadRouterWorkerRegistration,
  useReadWorkerRegistryLockPeriod,
  workerRegistryAbi,
} from '../contracts/subsquid.generated';

export function useFixWorkers<T extends Pick<Worker, 'id' | 'status'>>({
  workers,
}: {
  workers?: T[];
}) {
  const { ROUTER, CHAIN_ID_L1 } = useContracts();

  const { data: registryAddress, isLoading: isRegistryAddressLoading } =
    useReadRouterWorkerRegistration({
      address: ROUTER,
      query: { enabled: !!ROUTER },
    });

  const { data: lockPeriod, isLoading: isLockPeriodLoading } = useReadWorkerRegistryLockPeriod({
    address: registryAddress || '0x',
  });

  const { data: lastL1Block, isLoading: isLastL1BlockLoading } = useBlock({
    chainId: CHAIN_ID_L1,
    includeTransactions: false,
  });

  const { data: workersInfo, isLoading: isWorkersInfoLoading } = useReadContracts({
    contracts: workers?.map(worker => {
      return {
        abi: workerRegistryAbi,
        address: registryAddress || '0x',
        functionName: 'getWorker',
        args: [BigInt(worker.id)],
      } as const;
    }),
    allowFailure: false,
    query: {
      enabled: !!workers && !!registryAddress,
    },
  });

  const data = useMemo(() => {
    if (!workersInfo || !lastL1Block) return workers;

    return workers?.map((worker, i) => {
      const workerInfo = workersInfo?.[i];

      const registeredAt = workerInfo.registeredAt;
      const deregisteredAt = workerInfo.deregisteredAt + (lockPeriod ?? 0n);
      const timestamp = Number(lastL1Block.timestamp) * 1000;

      const { status, statusChangeAt } =
        lastL1Block.number < registeredAt
          ? {
              status: WorkerStatus.Registering,
              statusChangeAt: new Date(
                timestamp + getBlockTime(registeredAt - lastL1Block.number),
              ).toString(),
            }
          : lastL1Block.number < deregisteredAt
            ? {
                status: WorkerStatus.Deregistering,
                statusChangeAt: new Date(
                  timestamp + getBlockTime(deregisteredAt - lastL1Block.number),
                ).toString(),
              }
            : { status: worker.status };

      return {
        ...worker,
        status,
        statusChangeAt,
      };
    });
  }, [workers, workersInfo, lastL1Block, lockPeriod]);

  return {
    isLoading:
      isRegistryAddressLoading ||
      isLockPeriodLoading ||
      isLastL1BlockLoading ||
      isWorkersInfoLoading,
    data,
  };
}
