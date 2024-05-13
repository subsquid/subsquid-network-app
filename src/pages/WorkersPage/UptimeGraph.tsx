import React, { useMemo } from 'react';

import { dateFormat } from '@i18n';
import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import { keyBy } from 'lodash-es';

import { BlockchainApiFullWorker, useWorkerDaysUptimeById } from '@api/subsquid-network-squid';

import { StatusBar } from './StatusBar';

const StyledTitle = styled(Box)(({ theme: { spacing } }) => ({
  lineHeight: '1.875rem',
  marginBottom: spacing(2),
}));

const StyledGraph = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: spacing(1),
}));

const StyledNotes = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  opacity: '.8',
  marginBottom: spacing(2),
}));

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

export const UptimeGraph = ({ worker }: { worker: BlockchainApiFullWorker }) => {
  const theme = useTheme();
  const w1200 = useMediaQuery(theme.breakpoints.up(1200));
  const w1000 = useMediaQuery(theme.breakpoints.up(1000));
  const w600 = useMediaQuery(theme.breakpoints.up(600));

  const snapshots = useWorkerDaysUptimeById(worker.id);

  const displayedDays = w1200 ? 90 : w1000 ? 60 : w600 ? 45 : 30;

  const data = useMemo(() => {
    const uptimes = keyBy(
      snapshots.data.map(s => ({
        uptime: s.uptime,
        date: dateFormat(s.timestamp),
      })),
      'date',
    );

    return new Array(90)
      .fill('')
      .map((_, index) => {
        const date = dateFormat(new Date(new Date().getTime() - oneDayInMilliseconds * index))!;

        return {
          uptime: uptimes[date]?.uptime,
          date,
        };
      })
      .reverse()
      .slice(-displayedDays);
  }, [snapshots.data, displayedDays]);

  return (
    <Box sx={{ mt: 4 }}>
      <StyledTitle>Uptime graph</StyledTitle>
      <StyledGraph>
        {data.map(d => (
          <StatusBar key={d.date} dayUptime={d} />
        ))}
      </StyledGraph>
      <StyledNotes>
        <div>{displayedDays} days ago</div>
        <div>{percentFormatter(worker.uptime90Days)} uptime</div>
        <div>Today</div>
      </StyledNotes>
    </Box>
  );
};
