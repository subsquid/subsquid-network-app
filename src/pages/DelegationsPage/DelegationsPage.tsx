import { percentFormatter, tokenFormatter } from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SortDir, useMyDelegations, WorkerSortBy } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { NoItems } from '@components/NoItems';
import Placeholder from '@components/Placeholer';
import { SortableHeaderCell } from '@components/Table/BorderedTable';
import { DashboardTable } from '@components/Table/DashboardTable';
import { Location, useLocationState } from '@hooks/useLocationState';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { DelegationCapacity } from '@pages/WorkersPage/DelegationCapacity';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';
import { WorkerUndelegate } from '@pages/WorkersPage/WorkerUndelegate';

export function MyDelegations() {
  const [query, setQuery] = useLocationState({
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.MyDelegationReward),
    sortDir: new Location.Enum<SortDir>(SortDir.Desc),
  });
  const { workers: delegations, isLoading } = useMyDelegations({
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });
  const { SQD_TOKEN } = useContracts();

  // const groupedDelegations = useMemo(() => {
  //   return mapValues(
  //     keyBy(delegations, w => w.id),
  //     w => {
  //       return w.delegations.reduce(
  //         (s, d) => {
  //           s.deposit = s.deposit.plus(d.deposit);
  //           s.reward = s.reward.plus(d.claimedReward).plus(d.claimableReward);
  //           return s;
  //         },
  //         {
  //           deposit: new BigNumber(0),
  //           reward: new BigNumber(0),
  //         },
  //       );
  //     },
  //   );
  // }, [delegations]);

  return (
    <Box>
      <DashboardTable
        loading={isLoading}
        title={<SquaredChip label="My Delegations" color="primary" />}
      >
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
            <SortableHeaderCell sort={WorkerSortBy.StakerAPR} query={query} setQuery={setQuery}>
              Delegator APR
            </SortableHeaderCell>
            <SortableHeaderCell
              sort={WorkerSortBy.DelegationCapacity}
              query={query}
              setQuery={setQuery}
            >
              Delegation capacity
            </SortableHeaderCell>
            <SortableHeaderCell sort={WorkerSortBy.MyDelegation} query={query} setQuery={setQuery}>
              My Delegation
            </SortableHeaderCell>
            <SortableHeaderCell
              sort={WorkerSortBy.MyDelegationReward}
              query={query}
              setQuery={setQuery}
            >
              Total reward
            </SortableHeaderCell>
            <TableCell className="pinned"></TableCell>
          </TableRow>
        </TableHead>
        {delegations.length ? (
          <TableBody>
            {delegations.map(worker => {
              return (
                <TableRow key={worker.peerId}>
                  <TableCell className="pinned">
                    <WorkerName worker={worker} to={`/workers/${worker.peerId}`} />
                  </TableCell>
                  <TableCell>
                    <WorkerStatus worker={worker} />
                  </TableCell>
                  <TableCell>
                    {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                  </TableCell>
                  <TableCell>
                    <DelegationCapacity worker={worker} />
                  </TableCell>
                  <TableCell>{tokenFormatter(fromSqd(worker.myDelegation), SQD_TOKEN)}</TableCell>
                  <TableCell>
                    {tokenFormatter(fromSqd(worker.myTotalDelegationReward), SQD_TOKEN)}
                  </TableCell>
                  <TableCell className="pinned">
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <WorkerDelegate worker={worker} />
                      <WorkerUndelegate worker={worker} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <Placeholder>
            <NoItems />
          </Placeholder>
        )}
      </DashboardTable>
    </Box>
  );
}

export function DelegationsPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyDelegations />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
