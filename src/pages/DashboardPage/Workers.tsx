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

import {
  SortDir,
  useMySources,
  useNetworkSettings,
  useWorkers,
  WorkerSortBy,
  WorkerStatus,
  createDefaultWorker,
} from '@api/subsquid-network-squid';
import { Search } from '@components/Search/Search';
import { DashboardTable, SortableHeaderCell, NoItems } from '@components/Table';
import { Location, useLocationState } from '@hooks/useLocationState';
import { DelegationCapacity } from '@pages/WorkersPage/DelegationCapacity';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerStatusChip } from '@pages/WorkersPage/WorkerStatus';
import { WorkerVersion } from '@pages/WorkersPage/WorkerVersion';
import { SkeletonWrapper } from '@components/SkeletonWrapper';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { useMemo } from 'react';

function TableNavigation({
  totalPages,
  setPage,
  page,
  loading,
}: {
  setPage?: (page: number) => unknown;
  page: number;
  totalPages: number;
  loading?: boolean;
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
        size="small"
        onClick={() => {
          setPage?.(page - 1);
        }}
        disabled={!hasPrevPage}
      >
        <ArrowBackIosNew />
      </IconButton>
      <SkeletonWrapper loading={loading} width={50}>
        <Typography sx={{ fontVariant: 'tabular-nums' }}>
          {page} / {totalPages}
        </Typography>
      </SkeletonWrapper>
      <IconButton
        size="small"
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

const StyledTableRow = styled(TableRow)({
  minHeight: '48px',
  '& td': {
    height: '48px',
  },
});

export function Workers() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [query, setQuery] = useLocationState({
    page: new Location.Number(1),
    search: new Location.String(''),
    sortBy: new Location.Enum<WorkerSortBy>(WorkerSortBy.StakerAPR),
    sortDir: new Location.Enum<SortDir>(SortDir.Desc),
  });

  const { data: sources, isLoading: isSourcesLoading } = useMySources();

  const pageSize = 15;

  const {
    workers,
    totalPages,
    page,
    isLoading: isWorkersLoading,
  } = useWorkers({
    search: query.search,
    page: query.page,
    perPage: pageSize,
    sortBy: query.sortBy as WorkerSortBy,
    sortDir: query.sortDir as SortDir,
  });

  const {
    minimalWorkerVersion,
    recommendedWorkerVersion,
    isLoading: isSettingsLoading,
  } = useNetworkSettings();

  const isLoading = isSourcesLoading || isWorkersLoading || isSettingsLoading;

  const data = useMemo(
    () =>
      isLoading
        ? Array.from({ length: pageSize }, (_, index) => createDefaultWorker(index))
        : workers,
    [isLoading, workers],
  );

  return (
    <Box>
      <DashboardTable
        title={
          <Search
            placeholder="Search"
            value={query.search}
            onChange={setQuery.search}
            fullWidth={isMobile}
          />
        }
        sx={{ mb: 2 }}
      >
        <TableHead>
          <TableRow>
            <SortableHeaderCell sort={WorkerSortBy.Name} query={query} setQuery={setQuery}>
              Worker
            </SortableHeaderCell>
            <TableCell>Status</TableCell>
            <SortableHeaderCell sort={WorkerSortBy.Version} query={query} setQuery={setQuery}>
              Version
            </SortableHeaderCell>
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
              Created
            </SortableHeaderCell>
            <TableCell className="pinned"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map(worker => (
              <StyledTableRow key={worker.id}>
                <TableCell className="pinned">
                  <WorkerName
                    loading={isLoading}
                    worker={worker}
                    sx={{ width: { xs: 200, sm: 240 } }}
                  />
                </TableCell>
                <TableCell>
                  <WorkerStatusChip loading={isLoading} worker={worker} />
                </TableCell>
                <TableCell>
                  <WorkerVersion
                    loading={isLoading}
                    version={worker.version}
                    minimalWorkerVersion={minimalWorkerVersion}
                    recommendedWorkerVersion={recommendedWorkerVersion}
                  />
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
                    <span>{dateFormat(worker.createdAt)}</span>
                  </SkeletonWrapper>
                </TableCell>
                <TableCell className="pinned">
                  <Box display="flex" justifyContent="flex-end">
                    <SkeletonWrapper loading={isLoading}>
                      <WorkerDelegate worker={worker} sources={sources} />
                    </SkeletonWrapper>
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <NoItems />
          )}
        </TableBody>
      </DashboardTable>
      <TableNavigation
        page={page}
        totalPages={totalPages}
        setPage={setQuery.page}
        loading={isLoading}
      />
    </Box>
  );
}
