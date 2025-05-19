import { percentFormatter, tokenFormatter } from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useMemo } from 'react';

import {
  SortDir,
  useMySources,
  useMyWorkers,
  WorkerSortBy,
  WorkerStatus,
  AccountType,
  createDefaultWorker,
} from '@api/subsquid-network-squid';
import { SquaredChip } from '@components/Chip';
import { DashboardTable, SortableHeaderCell, NoItems } from '@components/Table';
import { Location, useLocationState } from '@hooks/useLocationState';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatusChip } from '@pages/WorkersPage/WorkerStatus';
import { SkeletonWrapper } from '@components/SkeletonWrapper';

import { AddWorkerButton } from './AddNewWorker';
import { WorkerUnregisterButton } from './WorkerUnregister';
import { WorkerVersion } from './WorkerVersion';
import { WorkerWithdrawButton } from './WorkerWithdraw';

export function MyWorkers() {
  const [query, setQuery] = useLocationState({
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.WorkerReward),
    sortDir: new Location.Enum<SortDir>(SortDir.Desc),
  });

  const { SQD_TOKEN } = useContracts();

  const { data: sources, isLoading: isSourcesLoading } = useMySources();

  const { data: workers, isLoading: isWorkersLoading } = useMyWorkers({
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });

  const isLoading = isSourcesLoading || isWorkersLoading;

  const data = useMemo(
    () =>
      isLoading ? Array.from({ length: 10 }, (_, index) => createDefaultWorker(index)) : workers,
    [isLoading, workers],
  );

  return (
    <Box>
      <DashboardTable
        title={
          <>
            <SquaredChip label="My Workers" color="primary" />
            <Stack direction="row" spacing={1}>
              <Button
                color="secondary"
                variant="outlined"
                component={Link}
                target="_blank"
                to="https://docs.sqd.dev/subsquid-network/participate/worker/"
              >
                LEARN MORE
              </Button>
              <AddWorkerButton sources={sources} disabled={isLoading} />
            </Stack>
          </>
        }
      >
        <>
          <TableHead>
            <TableRow>
              <SortableHeaderCell sort={WorkerSortBy.Name} query={query} setQuery={setQuery}>
                Worker
              </SortableHeaderCell>
              <TableCell>Status</TableCell>
              <SortableHeaderCell sort={WorkerSortBy.Version} query={query} setQuery={setQuery}>
                Version
              </SortableHeaderCell>
              <SortableHeaderCell sort={WorkerSortBy.Uptime24h} query={query} setQuery={setQuery}>
                Uptime, 24h
              </SortableHeaderCell>
              <SortableHeaderCell sort={WorkerSortBy.Uptime90d} query={query} setQuery={setQuery}>
                Uptime, 90d
              </SortableHeaderCell>
              <SortableHeaderCell sort={WorkerSortBy.WorkerAPR} query={query} setQuery={setQuery}>
                Worker APR
              </SortableHeaderCell>
              <SortableHeaderCell
                sort={WorkerSortBy.WorkerReward}
                query={query}
                setQuery={setQuery}
              >
                Total reward
              </SortableHeaderCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              data.map(worker => {
                return (
                  <TableRow key={worker.id}>
                    <TableCell>
                      <WorkerName loading={isLoading} worker={worker} />
                    </TableCell>
                    <TableCell>
                      <WorkerStatusChip loading={isLoading} worker={worker} />
                    </TableCell>
                    <TableCell>
                      <WorkerVersion loading={isLoading} version={worker.version} />
                    </TableCell>
                    <TableCell>
                      <SkeletonWrapper loading={isLoading}>
                        <span>{percentFormatter(worker.uptime24Hours)}</span>
                      </SkeletonWrapper>
                    </TableCell>
                    <TableCell>
                      <SkeletonWrapper loading={isLoading}>
                        <span>{percentFormatter(worker.uptime90Days)}</span>
                      </SkeletonWrapper>
                    </TableCell>
                    <TableCell>
                      <SkeletonWrapper loading={isLoading}>
                        <span>{worker.apr != null ? percentFormatter(worker.apr) : '-'}</span>
                      </SkeletonWrapper>
                    </TableCell>
                    <TableCell>
                      <SkeletonWrapper loading={isLoading}>
                        <span>
                          {tokenFormatter(
                            fromSqd(worker.claimableReward).plus(fromSqd(worker.claimedReward)),
                            SQD_TOKEN,
                          )}
                        </span>
                      </SkeletonWrapper>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <SkeletonWrapper loading={isLoading}>
                          {worker.status === WorkerStatus.Deregistered ||
                          worker.status === WorkerStatus.Deregistering ? (
                            <WorkerWithdrawButton
                              worker={worker}
                              source={{
                                ...worker.owner,
                                locked: !!worker.locked,
                                lockEnd: worker.lockEnd,
                              }}
                            />
                          ) : (
                            <WorkerUnregisterButton
                              worker={worker}
                              source={worker.owner}
                              disabled={worker.status !== WorkerStatus.Active}
                            />
                          )}
                        </SkeletonWrapper>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <NoItems>
                <span>No worker registered yet</span>
              </NoItems>
            )}
          </TableBody>
        </>
      </DashboardTable>
    </Box>
  );
}

export function WorkersPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyWorkers />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
