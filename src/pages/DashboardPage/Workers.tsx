import { dateFormat } from '@i18n';
import { percentFormatter } from '@lib/formatters/formatters';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import {
  IconButton,
  styled,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';

import { SortDir, useWorkers, WorkerSortBy } from '@api/subsquid-network-squid';
import { NoItems } from '@components/NoItems';
import Placeholder from '@components/Placeholer';
import { Search } from '@components/Search/Search';
import { SortableHeaderCell } from '@components/Table/BorderedTable';
import { DashboardTable } from '@components/Table/DashboardTable';
import { Location, useLocationState } from '@hooks/useLocationState';
import { DelegationCapacity } from '@pages/WorkersPage/DelegationCapacity';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';
import { WorkerVersion } from '@pages/WorkersPage/WorkerVersion';

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
  const hasNextPage = page < totalPages;

  return (
    <Box
      sx={{ textAlign: 'right', mt: 1 }}
      display="flex"
      alignItems="center"
      flex={1}
      justifyContent="flex-end"
    >
      <IconButton
        onClick={() => {
          setPage?.(page - 1);
        }}
        disabled={!hasPrevPage}
      >
        <ArrowBackIosNew />
      </IconButton>
      <Typography sx={{ fontVariant: 'tabular-nums' }}>
        {page} / {totalPages}
      </Typography>
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xxs'));

  const [query, setQuery] = useLocationState({
    page: new Location.Number(1),
    search: new Location.String(''),
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.StakerAPR),
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
      <DashboardTable
        loading={isLoading}
        title={
          <Search
            placeholder="Search "
            value={query.search}
            onChange={setQuery.search}
            fullWidth={isMobile}
          />
        }
      >
        <TableHead>
          <TableRow>
            <TableCell className="pinned" sx={{ width: 300 }}>
              Worker
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Version</TableCell>
            <SortableHeaderCell sort={WorkerSortBy.Uptime90d} query={query} setQuery={setQuery}>
              Uptime, 90d
            </SortableHeaderCell>
            <SortableHeaderCell sort={WorkerSortBy.WorkerAPR} query={query} setQuery={setQuery}>
              Worker APR
            </SortableHeaderCell>
            <SortableHeaderCell sort={WorkerSortBy.StakerAPR} query={query} setQuery={setQuery}>
              Delegator APR
            </SortableHeaderCell>
            <SortableHeaderCell
              sort={WorkerSortBy.DelegationCapacity}
              query={query}
              setQuery={setQuery}
              help={
                <Box>
                  The Delegator APR decreases significantly once more than 20,000 SQD is delegated
                  to the worker.
                  <br />
                  To maximize delegation rewards, choose workers with high uptime and a low amount
                  of delegated SQD.
                </Box>
              }
            >
              Delegation capacity
            </SortableHeaderCell>
            <SortableHeaderCell sort={WorkerSortBy.JoinedAt} query={query} setQuery={setQuery}>
              Registered
            </SortableHeaderCell>
            <TableCell className="pinned"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.length ? (
            workers.map(worker => {
              return (
                <TableRow key={worker.peerId}>
                  <TableCell className="pinned">
                    <WorkerName
                      worker={worker}
                      to={`/workers/${worker.peerId}?backPath=/dashboard`}
                    />
                  </TableCell>
                  <TableCell>
                    <WorkerStatus worker={worker} />
                  </TableCell>
                  <TableCell>
                    <WorkerVersion worker={worker} />
                  </TableCell>
                  <TableCell>{percentFormatter(worker.uptime90Days)}</TableCell>
                  <TableCell>{worker.apr != null ? percentFormatter(worker.apr) : '-'}</TableCell>
                  <TableCell>
                    {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                  </TableCell>
                  {/*<TableCell>{formatSqd(worker.totalDelegations.capacity, 0)}</TableCell>*/}
                  <TableCell>
                    <DelegationCapacity worker={worker} />
                  </TableCell>
                  <TableCell>{dateFormat(worker.createdAt)}</TableCell>
                  <TableCell className="pinned">
                    <Box display="flex" justifyContent="flex-end">
                      <WorkerDelegate worker={worker} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <Placeholder>
              <NoItems />
            </Placeholder>
          )}
        </TableBody>
      </DashboardTable>
      {isLoading ? null : (
        <TableNavigation page={page} totalPages={totalPages} setPage={setQuery.page} />
      )}
    </Box>
  );
}
