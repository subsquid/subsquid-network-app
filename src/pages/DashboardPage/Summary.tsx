import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import {
  bytesFormatter,
  numberWithCommasFormatter,
  percentFormatter,
  tokenFormatter,
} from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import { alpha, Box, Card, Divider, Stack, SxProps, Typography, useTheme } from '@mui/material';
import { Grid } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

import { useNetworkStats } from '@api/subsquid-network-squid';
import { useCurrentEpoch } from '@api/subsquid-network-squid';
import { SquaredChip } from '@components/Chip';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { SkeletonWrapper } from '@components/SkeletonWrapper';
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
  const { data, isLoading } = useNetworkStats();

  return (
    <SummarySection
      sx={{ height: 1 }}
      title={<SquaredChip label="Workers Online" color="primary" />}
      action={
        <SkeletonWrapper loading={isLoading} width={120}>
          <Stack direction="row" spacing={1}>
            <span>Data</span>
            <SquaredChip
              label={
                <Typography variant="subtitle1">{bytesFormatter(data?.storedData)}</Typography>
              }
              color="info"
            />
          </Stack>
        </SkeletonWrapper>
      }
    >
      <SkeletonWrapper loading={isLoading} width={240}>
        <Typography variant="h1" display="flex" alignItems="flex-end">
          <Box>{data?.onlineWorkersCount || 0}</Box>
          <Box color="text.disabled">/{data?.workersCount || 0}</Box>
        </Typography>
      </SkeletonWrapper>
    </SummarySection>
  );
}

function CurrentEpochEstimation({ epochEnd }: { epochEnd: number }) {
  const timeLeft = useCountdown({ timestamp: epochEnd });

  return (
    <Stack direction="row" spacing={1}>
      <span>Ends in</span>
      <SquaredChip
        label={<Typography variant="subtitle1">{timeLeft}</Typography>}
        color="warning"
      />
    </Stack>
  );
}

function CurrentEpoch() {
  const { data, isLoading } = useCurrentEpoch();
  const [epochEnd, setEpochEnd] = useState<number>(Date.now());

  useEffect(() => {
    if (!data || !data.epoch) return;

    const newEpochEnd =
      (data.epoch.end - data.lastBlockL1 + 1) * data.blockTimeL1 +
      new Date(data.lastBlockTimestampL1).getTime();

    setEpochEnd(newEpochEnd);
  }, [data]);

  return (
    <SummarySection
      sx={{ height: 1 }}
      title={<SquaredChip label="Current epoch" color="primary" />}
      action={
        <SkeletonWrapper loading={isLoading} width={120}>
          <CurrentEpochEstimation epochEnd={epochEnd} />
        </SkeletonWrapper>
      }
    >
      <SkeletonWrapper loading={isLoading} width={240}>
        <Typography variant="h1">{data?.epoch?.number || 0}</Typography>
      </SkeletonWrapper>
    </SummarySection>
  );
}

function Stats() {
  const { data, isLoading } = useNetworkStats();
  const { SQD_TOKEN } = useContracts();

  return (
    <SummarySection sx={{ height: 1 }} title={<SquaredChip label="Other Data" color="primary" />}>
      <Stack divider={<Divider />} spacing={1} flex={1}>
        <Box>
          <ColumnLabel>Total bond</ColumnLabel>
          <SkeletonWrapper loading={isLoading} width={320}>
            <ColumnValue>{tokenFormatter(fromSqd(data?.totalBond), SQD_TOKEN, 3)}</ColumnValue>
          </SkeletonWrapper>
        </Box>
        <Box>
          <ColumnLabel>Total delegation</ColumnLabel>
          <SkeletonWrapper loading={isLoading} width={320}>
            <ColumnValue>
              {tokenFormatter(fromSqd(data?.totalDelegation), SQD_TOKEN, 3)}
            </ColumnValue>
          </SkeletonWrapper>
        </Box>
        <Box>
          <ColumnLabel>Queries, 24h / 90d</ColumnLabel>
          <SkeletonWrapper loading={isLoading} width={320}>
            <ColumnValue>
              <span>
                {numberWithCommasFormatter(data?.queries24Hours) +
                  '/' +
                  numberWithCommasFormatter(data?.queries90Days)}
              </span>
            </ColumnValue>
          </SkeletonWrapper>
        </Box>
        <Box>
          <ColumnLabel>Data served, 24h / 90d</ColumnLabel>
          <SkeletonWrapper loading={isLoading} width={320}>
            <ColumnValue>
              {bytesFormatter(data?.servedData24Hours) +
                '/' +
                bytesFormatter(data?.servedData90Days)}
            </ColumnValue>
          </SkeletonWrapper>
        </Box>
      </Stack>
    </SummarySection>
  );
}

const placeholderData = [
  { date: '2024-01-01T00:00:00.000Z', value: 20.2 },
  { date: '2024-01-02T00:00:00.000Z', value: 20.5 },
  { date: '2024-01-03T00:00:00.000Z', value: 20.8 },
  { date: '2024-01-04T00:00:00.000Z', value: 20.6 },
  { date: '2024-01-05T00:00:00.000Z', value: 20.3 },
  { date: '2024-01-06T00:00:00.000Z', value: 20.1 },
  { date: '2024-01-07T00:00:00.000Z', value: 20.4 },
  { date: '2024-01-08T00:00:00.000Z', value: 20.7 },
  { date: '2024-01-09T00:00:00.000Z', value: 20.5 },
  { date: '2024-01-10T00:00:00.000Z', value: 20.2 },
  { date: '2024-01-11T00:00:00.000Z', value: 20.0 },
  { date: '2024-01-12T00:00:00.000Z', value: 20.3 },
  { date: '2024-01-13T00:00:00.000Z', value: 20.6 },
  { date: '2024-01-14T00:00:00.000Z', value: 20.4 },
];

function AprTooltip({ active, payload }: TooltipProps<number, string>) {
  return active && payload?.length ? (
    <SquaredChip
      label={<Typography variant="subtitle1">{percentFormatter(payload[0]?.value)}</Typography>}
      color="info"
      sx={{ transform: 'translateX(-50%)' }}
    />
  ) : null;
}

function AprChart({
  data,
  loading,
}: { data: { date: string; value: number }[]; loading?: boolean }) {
  const theme = useTheme();
  const ANIMATION_DURATION = 100;
  const ANIMATION_EASING = 'ease-out' as const;
  const ANIMATION_TRANSITION = `all ${ANIMATION_EASING} ${ANIMATION_DURATION}ms`;
  const memoizedData = useMemo(() => data, [data]);

  if (loading) {
    return (
      <>
        <style>
          {`
            @keyframes skeleton-pulse {
              0% { opacity: 1; }
              50% { opacity: 0.4; }
              100% { opacity: 1; }
            }
          `}
        </style>
        <ResponsiveContainer width="200%" height="85%" style={{ margin: theme.spacing(-1.5) }}>
          <AreaChart
            width={200}
            height={60}
            data={placeholderData}
            margin={{ top: 16, right: 0, left: 0, bottom: 0 }}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Area
              animationDuration={0}
              dataKey="value"
              strokeWidth={0}
              fill={alpha(theme.palette.action.active, theme.palette.action.activatedOpacity)}
              activeDot={false}
              style={{ animation: 'skeleton-pulse 2s ease-in-out 0.5s infinite' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    );
  }

  return (
    <>
      <style>{`
        .recharts-tooltip-cursor { 
          transition: all ease-out ${ANIMATION_DURATION}ms !important;
          pointer-events: none;
        }
        .recharts-wrapper {
          touch-action: none;
          }
      `}</style>
      <ResponsiveContainer width="200%" height="85%" style={{ margin: theme.spacing(-1.5) }}>
        <AreaChart
          width={200}
          height={60}
          data={memoizedData}
          defaultShowTooltip
          margin={{ top: 16, right: 0, left: 0, bottom: 0 }}
          style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
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
              defaultIndex={Math.max(data.length - 2, 0)}
              active
              allowEscapeViewBox={{ x: true }}
              position={{ y: -10 }}
              wrapperStyle={{
                zIndex: 1,
                transition: ANIMATION_TRANSITION,
                WebkitTapHighlightColor: 'transparent',
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
  const { data, isLoading } = useNetworkStats();

  const aprs = useMemo(() => {
    if (!data?.aprs || !data?.workerApr) return [];

    return data.aprs.slice(length ? -length : 0).map((apr, i) => ({
      date: apr.timestamp,
      value: i === data.aprs.length - 1 ? (apr.workerApr + data.workerApr) / 2 : apr.workerApr,
    }));
  }, [data?.aprs, data?.workerApr, length]);

  return (
    <SummarySection
      sx={{ height: 1, overflow: 'visible' }}
      title={<SquaredChip label="Worker APR" color="primary" />}
      action={
        <SkeletonWrapper loading={isLoading} width={120}>
          <HelpTooltip title="Median value">
            <span>{`Last ${aprs.length} days`}</span>
          </HelpTooltip>
        </SkeletonWrapper>
      }
    >
      <AprChart data={aprs} loading={isLoading} />
    </SummarySection>
  );
}

function DelegatorsApr({ length }: { length?: number }) {
  const { data, isLoading } = useNetworkStats();

  const aprs = useMemo(() => {
    if (!data?.aprs || !data?.stakerApr) return [];

    return data.aprs.slice(length ? -length : 0).map((apr, i) => ({
      date: apr.timestamp,
      value: i === data.aprs.length - 1 ? (apr.stakerApr + data.stakerApr) / 2 : apr.stakerApr,
    }));
  }, [data?.aprs, data?.stakerApr, length]);

  return (
    <SummarySection
      sx={{ height: 1, overflow: 'visible' }}
      title={<SquaredChip label="Delegator APR" color="primary" />}
      action={
        <SkeletonWrapper loading={isLoading} width={120}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography>{`Last ${aprs.length} days`}</Typography>
            <HelpTooltip title="Median value" />
          </Stack>
        </SkeletonWrapper>
      }
    >
      <AprChart data={aprs} loading={isLoading} />
    </SummarySection>
  );
}

export function NetworkSummary() {
  const theme = useTheme();

  const size = { minHeight: 128, height: { xs: 'auto', md: 0.5 } };

  return (
    <Box minHeight={528} mb={2} display="flex">
      <Grid container spacing={2} flex={1}>
        {/* FIXME: some wtf hack with mb */}
        <Grid container size={{ xs: 12, sm: 12, md: 8 }} mb={{ xs: 0, md: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ ...size }}>
            <OnlineInfo />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ ...size }}>
            <CurrentEpoch />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ ...size }}>
            <WorkersApr />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ ...size }}>
            <DelegatorsApr />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <Stats />
        </Grid>
      </Grid>
    </Box>
  );
}
