import React from 'react';

import { dateFormat } from '@i18n';
import { percentFormatter } from '@lib/formatters/formatters.ts';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { SortDir, useWorkers, WorkerSortBy } from '@api/subsquid-network-squid';
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
    perPage: 20,
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });

  if (isLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle
        title="Dashboard"
        endAdornment={
          <Search placeholder="Search " value={query.search} onChange={setQuery.search} />
        }
      />

      <BorderedTable>
        <TableHead>
          <TableRow>
            <TableCell>Worker</TableCell>
            <TableCell>Status</TableCell>
            <SortableHeaderCell
              width={75}
              sort={WorkerSortBy.Uptime24h}
              query={query}
              setQuery={setQuery}
            >
              Uptime last 24 hours
            </SortableHeaderCell>
            <SortableHeaderCell sort={WorkerSortBy.WorkerAPR} query={query} setQuery={setQuery}>
              Worker APR
            </SortableHeaderCell>
            <SortableHeaderCell sort={WorkerSortBy.StakerAPR} query={query} setQuery={setQuery}>
              Staker APR
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
              Joined date
            </SortableHeaderCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map(worker => {
            return (
              <TableRow
                onClick={() => navigate(`/dashboard/workers/${worker.peerId}`)}
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
                <TableCell>{percentFormatter(worker.apr)}</TableCell>
                <TableCell>{percentFormatter(worker.stakerApr)}</TableCell>
                {/*<TableCell>{formatSqd(worker.totalDelegations.capacity, 0)}</TableCell>*/}
                <TableCell>{dateFormat(worker.createdAt)}</TableCell>
                <TableCell>
                  <WorkerDelegate worker={worker} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </BorderedTable>
      <TableNavigation page={page} totalPages={totalPages} setPage={setQuery.page} />
    </Box>
  );
}