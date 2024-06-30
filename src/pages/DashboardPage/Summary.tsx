import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import {
  bytesFormatter,
  numberWithSpacesFormatter,
  tokenFormatter,
} from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import { Box, Card, Divider, Stack, SxProps, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { useNetworkSummary } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { Loader } from '@components/Loader';
import { useContracts } from '@network/useContracts';

export function ColumnLabel({ children, color }: PropsWithChildren<{ color?: string }>) {
  return (
    <Typography variant="h4" mb={1} mt={1} color={color}>
      {children}
    </Typography>
  );
}

export function ColumnValue({ children }: PropsWithChildren) {
  return <Typography variant="h2">{children}</Typography>;
}

export function SummarySection({
  title,
  action,
  sx,
  children,
  loading,
}: PropsWithChildren<{
  title?: React.ReactNode;
  action?: React.ReactNode;
  sx?: SxProps;
  loading?: boolean;
}>) {
  return (
    <Card sx={sx}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 1,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" justifyContent="flex-start">
            {title}
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {action}
          </Box>
        </Box>
        <Box display="flex" justifyContent="stretch" alignItems="flex-end" flex={1}>
          {loading ? <Loader /> : children}
        </Box>
      </Box>
    </Card>
  );
}

function OnlineInfo() {
  const { data, isLoading } = useNetworkSummary();

  return (
    <SummarySection
      sx={{ height: 1 }}
      loading={isLoading}
      title={<SquaredChip label="Workers Online" color="primary" />}
      action={
        <Stack direction="row" spacing={1}>
          <span>Data</span>
          <SquaredChip label={bytesFormatter(data?.storedData)} color="info" />
        </Stack>
      }
    >
      <Box display="flex">
        <Typography variant="h1">{data?.onlineWorkersCount || 0}</Typography>
        <Typography variant="h1" color={theme => theme.palette.text.disabled}>
          /{data?.workersCount || 0}
        </Typography>
      </Box>
    </SummarySection>
  );
}

function CurrentEpoch() {
  const { data, isLoading } = useNetworkSummary();

  const [epochEnd, setEpochEnd] = useState<number>(Date.now());
  const [curTime, setCurTime] = useState(Date.now());

  const epochEndsIn = useMemo(() => {
    const secondsLeft = Math.ceil(Math.max(epochEnd - curTime, 0) / 1000);
    const { hours, minutes, seconds } = {
      hours: Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60)),
      minutes: Math.floor((secondsLeft % (60 * 60)) / 60),
      seconds: Math.floor(secondsLeft % 60),
    };

    let res = '';
    if (hours) {
      res += `${hours}h `;
    }
    if (minutes) {
      res += `${minutes}m `;
    }
    if (!hours) {
      res += `${seconds}s`;
    }

    return res;
  }, [curTime, epochEnd]);

  useEffect(() => {
    if (!data) return;

    const newEpochEnd =
      (data.epoch.end - data.lastBlockL1 + 1) * data.blockTimeL1 +
      new Date(data.lastBlockTimestampL1).getTime();

    setEpochEnd(newEpochEnd);
  }, [data, epochEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SummarySection
      sx={{ height: 1 }}
      loading={isLoading}
      title={<SquaredChip label="Current epoch" color="primary" />}
      action={
        <Stack direction="row" spacing={1}>
          <span>Ends in</span>
          <SquaredChip
            label={<Box sx={{ fontVariantNumeric: 'tabular-nums' }}>~{epochEndsIn}</Box>}
            color="warning"
          />
        </Stack>
      }
    >
      <Box fontSize={64} lineHeight="64px">
        {data?.epoch?.number || 0}
      </Box>
    </SummarySection>
  );
}

function Stats() {
  const { data, isLoading } = useNetworkSummary();
  const { SQD_TOKEN } = useContracts();

  return (
    <SummarySection
      loading={isLoading}
      sx={{ height: 1 }}
      title={<SquaredChip label="Other Data" color="primary" />}
    >
      <Stack divider={<Divider />} spacing={1}>
        <Box>
          <ColumnLabel>Total bond</ColumnLabel>
          <ColumnValue>{tokenFormatter(fromSqd(data?.totalBond), SQD_TOKEN, 3)}</ColumnValue>
        </Box>
        <Box>
          <ColumnLabel>Total delegation</ColumnLabel>
          <ColumnValue>{tokenFormatter(fromSqd(data?.totalDelegation), SQD_TOKEN, 3)}</ColumnValue>
        </Box>
        {/* <Box>
            <WorkerColumnLabel>Worker APR</WorkerColumnLabel>
            <WorkerColumnValue>{percentFormatter(data?.workerApr)}</WorkerColumnValue>
          </Box>
          <Box>
            <WorkerColumnLabel>Delegator APR</WorkerColumnLabel>
            <WorkerColumnValue>{percentFormatter(data?.stakerApr)}</WorkerColumnValue>
          </Box> */}
        <Box>
          <ColumnLabel>Queries, 24h / 90d</ColumnLabel>
          <ColumnValue>
            {numberWithSpacesFormatter(data?.queries24Hours)} /{' '}
            {numberWithSpacesFormatter(data?.queries90Days)}
          </ColumnValue>
        </Box>
        <Box>
          <ColumnLabel>Data served, 24h / 90d</ColumnLabel>
          <ColumnValue>
            {bytesFormatter(data?.servedData24Hours)} / {bytesFormatter(data?.servedData90Days)}
          </ColumnValue>
        </Box>
      </Stack>
    </SummarySection>
  );
}

export function NetworkSummary() {
  return (
    <Box minHeight={528} mb={2} display="flex">
      <>
        <Grid container spacing={2} disableEqualOverflow flex={1}>
          <Grid container xxs={8}>
            <Grid xxs={6} minHeight={0.5}>
              <OnlineInfo />
            </Grid>
            <Grid xxs={6} minHeight={0.5}>
              <CurrentEpoch />
            </Grid>
            <Grid xxs={6} minHeight={0.5}>
              <SummarySection
                sx={{ height: 1 }}
                title={<SquaredChip label="Worker APR" color="primary" />}
                action="Last 14 days"
              >
                <Box display="flex" fontSize={20}>
                  No Data
                </Box>
              </SummarySection>
            </Grid>
            <Grid xxs={6} minHeight={0.5}>
              <SummarySection
                sx={{ height: 1 }}
                title={<SquaredChip label="Delegator APR" color="primary" />}
                action="Last 14 days"
              >
                <Box display="flex" fontSize={20}>
                  No Data
                </Box>
              </SummarySection>
            </Grid>
          </Grid>
          <Grid xxs={4}>
            <Stats />
          </Grid>
        </Grid>
        {/* <Box height={500}>
            <ResponsiveChartContainer
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  type: 'line',
                  area: true,
                  curve: 'linear',
                  color: theme.palette.info.main,
                },
              ]}
              xAxis={[
                {
                  data: [1, 2, 3, 4, 5, 6],
                },
              ]}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: 'url(#area-gradient)',
                },
              }}
            >
              <LinePlot></LinePlot>
              <AreaPlot></AreaPlot>
              <defs>
                <linearGradient id="area-gradient" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e66465" />
                  <stop offset="100%" stopColor="#9198e5" />
                </linearGradient>
              </defs>
            </ResponsiveChartContainer>
          </Box> */}
      </>
    </Box>
  );
}
