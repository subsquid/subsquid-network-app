import { percentFormatter, tokenFormatter } from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SortDir, useMyWorkers, WorkerSortBy, WorkerStatus } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { DashboardTable, SortableHeaderCell, NoItems } from '@components/Table';
import { Location, useLocationState } from '@hooks/useLocationState';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatusChip } from '@pages/WorkersPage/WorkerStatus';

import { AddNewWorker } from './AddNewWorker';
import { WorkerUnregisterButton } from './WorkerUnregister';
import { WorkerVersion } from './WorkerVersion';
import { WorkerWithdrawButton } from './WorkerWithdraw';

export function MyWorkers() {
  const [query, setQuery] = useLocationState({
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.WorkerReward),
    sortDir: new Location.Enum<SortDir>(SortDir.Desc),
  });
  const { data, isLoading } = useMyWorkers({
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });
  const { isConnected } = useAccount();
  const { SQD_TOKEN } = useContracts();

  return (
    <Box>
      <DashboardTable
        loading={isLoading}
        title={
          <>
            <SquaredChip label="My Workers" color="primary" />
            <Stack direction="row" spacing={1}>
              <AddNewWorker />
              <Button color="secondary" variant="outlined">
                LEARN MORE
              </Button>
            </Stack>
          </>
        }
      >
        <>
          <TableHead>
            <TableRow>
              <SortableHeaderCell
                sort={WorkerSortBy.Name}
                query={query}
                setQuery={setQuery}
                sx={{ width: 300 }}
              >
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
            {data.length ? (
              data.map(worker => {
                return (
                  <TableRow key={worker.peerId}>
                    <TableCell>
                      <WorkerName worker={worker} to={`/workers/${worker.peerId}`} />
                    </TableCell>
                    <TableCell>
                      <WorkerStatusChip worker={worker} />
                    </TableCell>
                    <TableCell>
                      <WorkerVersion worker={worker} />
                    </TableCell>
                    <TableCell>{percentFormatter(worker.uptime24Hours)}</TableCell>
                    <TableCell>{percentFormatter(worker.uptime90Days)}</TableCell>
                    <TableCell>{worker.apr != null ? percentFormatter(worker.apr) : '-'}</TableCell>
                    <TableCell>
                      {tokenFormatter(
                        fromSqd(worker.claimableReward).plus(fromSqd(worker.claimedReward)),
                        SQD_TOKEN,
                      )}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        {worker.status === WorkerStatus.Deregistered ||
                        worker.status === WorkerStatus.Deregistering ? (
                          <WorkerWithdrawButton
                            worker={worker}
                            owner={worker.owner}
                            disabled={worker.status !== WorkerStatus.Deregistered}
                          />
                        ) : (
                          <WorkerUnregisterButton
                            worker={worker}
                            owner={worker.owner}
                            disabled={worker.status !== WorkerStatus.Active}
                          />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <NoItems />
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
