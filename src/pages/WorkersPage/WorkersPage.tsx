import { percentFormatter, tokenFormatter } from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { SortDir, useMyWorkers, WorkerSortBy } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable, SortableHeaderCell } from '@components/Table/BorderedTable';
import { Location, useLocationState } from '@hooks/useLocationState';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';

import { WorkerUnregister } from './WorkerUnregister';

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
      <NetworkPageTitle
        title="My Workers"
        endAdornment={
          <Button variant="contained" disabled={!isConnected} component={Link} to="/workers/add">
            Add worker
          </Button>
        }
      />
      {isLoading ? (
        <Loader />
      ) : data.length ? (
        <Card noPadding>
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell width={275}>Worker</TableCell>
                <TableCell>Status</TableCell>
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
              {data.map(worker => {
                return (
                  <TableRow key={worker.peerId}>
                    <TableCell>
                      <WorkerName worker={worker} to={`/workers/${worker.peerId}`} />
                    </TableCell>
                    <TableCell>
                      <WorkerStatus worker={worker} />
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
                        <WorkerUnregister worker={worker} />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </BorderedTable>
        </Card>
      ) : (
        <Card sx={{ textAlign: 'center' }}>No items to show</Card>
      )}
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
