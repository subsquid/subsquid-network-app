import { dateFormat } from '@i18n';
import { percentFormatter, tokenFormatter } from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, styled, useMediaQuery, useTheme, Typography } from '@mui/material';

import {
  SortDir,
  useMyDelegations,
  useMySources,
  useNetworkSettings,
  useWorkers,
  WorkerSortBy,
  WorkerStatus,
  AccountType,
  createDefaultWorker,
} from '@api/subsquid-network-squid';
import { SquaredChip } from '@components/Chip';
import { DashboardTable, NoItems, SortableHeaderCell } from '@components/Table';
import { Location, useLocationState } from '@hooks/useLocationState';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { DelegationCapacity } from '@pages/WorkersPage/DelegationCapacity';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatusChip } from '@pages/WorkersPage/WorkerStatus';
import { WorkerUndelegate } from '@pages/WorkersPage/WorkerUndelegate';
import { SkeletonWrapper } from '@components/SkeletonWrapper';
import { WorkerVersion } from '@pages/WorkersPage/WorkerVersion';
import { Search } from '@components/Search/Search';

export function MyDelegations() {
  const [query, setQuery] = useLocationState({
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.MyDelegationReward),
    sortDir: new Location.Enum<SortDir>(SortDir.Desc),
  });

  const { data: delegations, isLoading: isDelegationsLoading } = useMyDelegations({
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });
  const { data: sources, isLoading: isSourcesLoading } = useMySources({});

  const { SQD_TOKEN } = useContracts();

  const isLoading = isDelegationsLoading || isSourcesLoading;

  const data = useMemo(
    () =>
      isLoading
        ? Array.from({ length: 10 }, (_, index) => createDefaultWorker(index))
        : delegations,
    [isLoading, delegations],
  );

  return (
    <Box>
      <DashboardTable title={<SquaredChip label="My Delegations" color="primary" />} sx={{ mb: 2 }}>
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
        <TableBody>
          {data.length ? (
            data.map(worker => (
              <TableRow key={worker.id}>
                <TableCell className="pinned">
                  <WorkerName loading={isLoading} worker={worker} />
                </TableCell>
                <TableCell>
                  <WorkerStatusChip loading={isLoading} worker={worker} />
                </TableCell>
                <TableCell>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                    </span>
                  </SkeletonWrapper>
                </TableCell>
                <TableCell>
                  <SkeletonWrapper loading={isLoading}>
                    <DelegationCapacity worker={worker} />
                  </SkeletonWrapper>
                </TableCell>
                <TableCell>
                  <SkeletonWrapper loading={isLoading}>
                    <span>{tokenFormatter(fromSqd(worker.myDelegation), SQD_TOKEN)}</span>
                  </SkeletonWrapper>
                </TableCell>
                <TableCell>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(fromSqd(worker.myTotalDelegationReward), SQD_TOKEN)}
                    </span>
                  </SkeletonWrapper>
                </TableCell>
                <TableCell className="pinned">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <SkeletonWrapper loading={isLoading}>
                      <WorkerDelegate worker={worker} sources={sources} />
                    </SkeletonWrapper>
                    <SkeletonWrapper loading={isLoading}>
                      <WorkerUndelegate
                        worker={worker}
                        sources={worker.delegations.map(d => ({
                          id: d.owner.id,
                          type: d.owner.type,
                          balance: d.deposit,
                          locked: d.locked || false,
                          lockEnd: d.lockEnd,
                        }))}
                        disabled={isLoading}
                      />
                    </SkeletonWrapper>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoItems />
          )}
        </TableBody>
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
