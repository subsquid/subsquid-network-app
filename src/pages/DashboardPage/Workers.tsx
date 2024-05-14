import React from 'react';

import { dateFormat } from '@i18n';
import { percentFormatter } from '@lib/formatters/formatters.ts';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, styled, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { SortDir, useWorkers, WorkerSortBy } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { Search } from '@components/Search/Search';
import { BorderedTable, SortableHeaderCell } from '@components/Table/BorderedTable';
import { Location, useLocationState } from '@hooks/useLocationState';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';

import { WorkerDelegate } from '../WorkersPage/WorkerDelegate';
import { WorkerName } from '../WorkersPage/WorkerName';

function TableNavigation({
  totalPages,
  setPage,
  page,
}: {
  setPage?: (page: number) => unknown;
  page: number;
  totalPages: number;
}) {
  const hasPrevPage = page > 1;
  const hasNextPage = page <= totalPages;

  return (
    <Box sx={{ textAlign: 'right', mt: 1 }}>
      <IconButton
        onClick={() => {
          setPage?.(page - 1);
        }}
        disabled={!hasPrevPage}
      >
        <ArrowBackIosNew />
      </IconButton>
      <IconButton
        onClick={() => {
          setPage?.(page + 1);
        }}
        disabled={!hasNextPage}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}

export const SummaryLabel = styled(Box, {
  name: 'SummaryLabel',
})(({ theme }) => ({
  color: theme.palette.text.primary,
  flex: 1,
}));
export const SummaryValue = styled(Box, {
  name: 'SummaryValue',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  flex: 1,
}));

export function Workers() {
  const navigate = useNavigate();
  const [query, setQuery] = useLocationState({
    page: new Location.Number(1),
    search: new Location.String(''),
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.JoinedAt),
    sortDir: new Location.Enum<SortDir>(SortDir.Desc),
  });
  const { workers, totalPages, page, isLoading } = useWorkers({
    search: query.search,
    page: query.page,
    perPage: 15,
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });

  return (
    <Box>
      <NetworkPageTitle
        title="Dashboard"
        endAdornment={
          <Search placeholder="Search " value={query.search} onChange={setQuery.search} />
        }
      />

      {isLoading ? (
        <Loader />
      ) : workers.length ? (
        <>
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 275 }}>Worker</TableCell>
                <TableCell>Status</TableCell>
                <SortableHeaderCell sort={WorkerSortBy.Uptime24h} query={query} setQuery={setQuery}>
                  Uptime, 24h
                </SortableHeaderCell>
                <SortableHeaderCell sort={WorkerSortBy.WorkerAPR} query={query} setQuery={setQuery}>
                  Worker APR, 7d
                </SortableHeaderCell>
                <SortableHeaderCell sort={WorkerSortBy.StakerAPR} query={query} setQuery={setQuery}>
                  Delegator APR, 7d
                </SortableHeaderCell>
                {/*<SortableHeaderCell*/}
                {/*  width={70}*/}
                {/*  sort={WorkerSortBy.DelegationCapacity}*/}
                {/*  query={query}*/}
                {/*  setQuery={setQuery}*/}
                {/*>*/}
                {/*  Delegation capacity*/}
                {/*</SortableHeaderCell>*/}
                <SortableHeaderCell sort={WorkerSortBy.JoinedAt} query={query} setQuery={setQuery}>
                  Registered
                </SortableHeaderCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map(worker => {
                return (
                  <TableRow
                    onClick={() => navigate(`/workers/${worker.peerId}?backPath=/dashboard`)}
                    className="hoverable"
                    key={worker.peerId}
                  >
                    <TableCell>
                      <WorkerName worker={worker} />
                    </TableCell>
                    <TableCell>
                      <WorkerStatus worker={worker} />
                    </TableCell>
                    <TableCell>{percentFormatter(worker.uptime24Hours)}</TableCell>
                    <TableCell>{worker.apr != null ? percentFormatter(worker.apr) : '-'}</TableCell>
                    <TableCell>
                      {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                    </TableCell>
                    {/*<TableCell>{formatSqd(worker.totalDelegations.capacity, 0)}</TableCell>*/}
                    <TableCell>{dateFormat(worker.createdAt)}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <WorkerDelegate worker={worker} />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </BorderedTable>
          <TableNavigation page={page} totalPages={totalPages} setPage={setQuery.page} />
        </>
      ) : (
        <Card sx={{ textAlign: 'center' }}>No items to show</Card>
      )}
    </Box>
  );
}
