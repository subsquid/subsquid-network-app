import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import {
  bytesFormatter,
  numberWithCommasFormatter,
  percentFormatter,
  tokenFormatter,
} from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import {
  alpha,
  Box,
  Card,
  Divider,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AreaChart, Area, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

import { useNetworkSummary } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { useCountdown } from '@hooks/useCountdown';
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
        <Box display="flex" justifyContent="space-between" mb={1}>
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
          <SquaredChip
            label={<Typography variant="subtitle1">{bytesFormatter(data?.storedData)}</Typography>}
            color="info"
          />
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

function CurrentEpochEstimation({ epochEnd }: { epochEnd: number }) {
  const timeLeft = useCountdown({ timestamp: epochEnd });

  return (
    <Stack direction="row" spacing={1}>
      <span>Ends in</span>
      <SquaredChip
        label={<Typography variant="subtitle1">~{timeLeft}</Typography>}
        color="warning"
      />
    </Stack>
  );
}

function CurrentEpoch() {
  const { data, isLoading } = useNetworkSummary();

  const [epochEnd, setEpochEnd] = useState<number>(Date.now());
  useEffect(() => {
    if (!data || !data.epoch) return;

    const newEpochEnd =
      (data.epoch.end - data.lastBlockL1 + 1) * data.blockTimeL1 +
      new Date(data.lastBlockTimestampL1).getTime();

    setEpochEnd(newEpochEnd);
  }, [data, epochEnd]);

  return (
    <SummarySection
      sx={{ height: 1 }}
      loading={isLoading}
      title={<SquaredChip label="Current epoch" color="primary" />}
      action={<CurrentEpochEstimation epochEnd={epochEnd} />}
    >
      <Typography variant="h1">{data?.epoch?.number || 0}</Typography>
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
            {numberWithCommasFormatter(data?.queries24Hours)} /{' '}
            {numberWithCommasFormatter(data?.queries90Days)}
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

function AprTooltip({ active, payload }: TooltipProps<number, string>) {
  return active && payload?.length ? (
    <SquaredChip
      label={<Typography variant="subtitle1">{percentFormatter(payload[0]?.value)}</Typography>}
      color="info"
      sx={{ transform: 'translateX(-50%)' }}
    />
  ) : null;
}

function AprChart({ data }: { data: { date: string; value: number }[] }) {
  const theme = useTheme();
  const ANIMATION_DURATION = 100;
  const ANIMATION_EASING = 'ease-out' as const;
  const ANIMATION_TRANSITION = `all ${ANIMATION_EASING} ${ANIMATION_DURATION}ms`;

  return (
    <>
      <style>{`.recharts-tooltip-cursor { transition: all ease-out ${ANIMATION_DURATION}ms !important; }`}</style>
      <ResponsiveContainer width="200%" height="85%" style={{ margin: theme.spacing(-1.5) }}>
        <AreaChart
          width={200}
          height={60}
          data={data}
          defaultShowTooltip
          margin={{ top: 16, right: 0, left: 0, bottom: 0 }}
          style={{ cursor: 'pointer' }}
        >
          <defs>
            <linearGradient id="area-gradient" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.palette.info.main} />
              <stop offset="100%" stopColor={alpha(theme.palette.info.main, 0.25)} />
            </linearGradient>
          </defs>
          {data.length ? (
            <Tooltip
              content={<AprTooltip />}
              animationDuration={0}
              cursor={{
                stroke: theme.palette.text.secondary,
                strokeWidth: 2,
                strokeDasharray: 6,
              }}
              cursorStyle={{
                transform: 'translateX(-50%)',
              }}
              defaultIndex={Math.max(data.length - 2, 0)}
              active
              allowEscapeViewBox={{ x: true }}
              position={{ y: -10 }}
              wrapperStyle={{
                zIndex: theme.zIndex.appBar - 1,
                transition: ANIMATION_TRANSITION,
              }}
              offset={0}
              trigger="click"
              filterNull
            />
          ) : null}
          <Area
            animationDuration={0}
            dataKey="value"
            stroke={theme.palette.info.main}
            strokeWidth={theme.spacing(0.5)}
            fill="url(#area-gradient)"
            activeDot={{ strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

function WorkersApr({ length }: { length?: number }) {
  const { data, isLoading } = useNetworkSummary();

  const aprs = useMemo(() => {
    if (!data) return [];

    return data.aprs.slice(length ? -length : 0).map((apr, i) => ({
      date: apr.timestamp,
      value: i === data.aprs.length - 1 ? (apr.workerApr + data.workerApr) / 2 : apr.workerApr,
    }));
  }, [data, length]);

  return (
    <SummarySection
      loading={isLoading}
      sx={{ height: 1, overflow: 'visible' }}
      title={<SquaredChip label="Worker APR" color="primary" />}
      action={
        <HelpTooltip title="Median value">
          <span>{`Last ${aprs.length} days`}</span>
        </HelpTooltip>
      }
    >
      <AprChart data={aprs} />
    </SummarySection>
  );
}

function DelegatorsApr({ length }: { length?: number }) {
  const { data, isLoading } = useNetworkSummary();

  const aprs = useMemo(() => {
    if (!data) return [];

    return data.aprs.slice(length ? -length : 0).map((apr, i) => ({
      date: apr.timestamp,
      value: i === data.aprs.length - 1 ? (apr.stakerApr + data.stakerApr) / 2 : apr.stakerApr,
    }));
  }, [data, length]);

  return (
    <SummarySection
      loading={isLoading}
      sx={{ height: 1, overflow: 'visible' }}
      title={<SquaredChip label="Delegator APR" color="primary" />}
      action={
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography>{`Last ${aprs.length} days`}</Typography>
          <HelpTooltip title="Median value" />
        </Stack>
      }
    >
      <AprChart data={aprs} />
    </SummarySection>
  );
}

export function NetworkSummary() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const size = isMobile ? { minHeight: 128 } : { height: 0.5 };

  return (
    <Box minHeight={528} mb={2} display="flex">
      <>
        <Grid container spacing={2} disableEqualOverflow flex={1}>
          <Grid container xxs={12} sm={8}>
            <Grid xxs={12} sm={6} sx={{ ...size }}>
              <OnlineInfo />
            </Grid>
            <Grid xxs={12} sm={6} sx={{ ...size }}>
              <CurrentEpoch />
            </Grid>
            <Grid xxs={12} sm={6} sx={{ ...size }}>
              <WorkersApr />
            </Grid>
            <Grid xxs={12} sm={6} sx={{ ...size }}>
              <DelegatorsApr />
            </Grid>
          </Grid>
          <Grid xxs={12} sm={4}>
            <Stats />
          </Grid>
        </Grid>

        {/* <Box height={500}>
            
          </Box> */}
      </>
    </Box>
  );
}
