import { useEffect, useMemo, useState } from 'react';

import {
  bytesFormatter,
  numberWithSpacesFormatter,
  percentFormatter,
  tokenFormatter,
} from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import { Box, Stack, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { useNetworkSummary } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { useContracts } from '@network/useContracts';

export const WorkerColumnLabel = styled(Box, {
  name: 'WorkerColumnLabel',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  marginBottom: theme.spacing(0.5),
}));

export const WorkerColumnValue = styled(Box, {
  name: 'WorkerColumnLabel',
})(() => ({
  fontSize: 18,
  fontWeight: 500,
}));

function OnlineInfo() {
  const { data } = useNetworkSummary();

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <WorkerColumnLabel>Workers online</WorkerColumnLabel>
          <WorkerColumnValue>
            {data?.onlineWorkersCount || 0} / {data?.workersCount || 0}
          </WorkerColumnValue>
        </Box>
        <Box textAlign="end">
          <WorkerColumnLabel>Data stored</WorkerColumnLabel>
          <WorkerColumnValue>{bytesFormatter(data?.storedData)}</WorkerColumnValue>
        </Box>
      </Stack>
    </Card>
  );
}

function CurrentEpoch() {
  const { data } = useNetworkSummary();

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
      (data.epoch.end - data.lastBlockL1) * data.blockTimeL1 +
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
    <Card>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box>
          <WorkerColumnLabel>Current epoch</WorkerColumnLabel>
          <WorkerColumnValue>{data?.epoch?.number || 0}</WorkerColumnValue>
        </Box>
        <Box textAlign="end" sx={{ fontVariantNumeric: 'tabular-nums' }}>
          <WorkerColumnLabel>Ends in</WorkerColumnLabel>
          <WorkerColumnValue>~{epochEndsIn}</WorkerColumnValue>
        </Box>
      </Stack>
    </Card>
  );
}

function Stats() {
  const { data } = useNetworkSummary();
  const { SQD_TOKEN } = useContracts();

  return (
    <Card>
      <Grid container direction="row" spacing={2}>
        <Grid container direction="row" xxs={12} xs={4}>
          <Grid xxs={12}>
            <WorkerColumnLabel>Total bond</WorkerColumnLabel>
            <WorkerColumnValue>
              {tokenFormatter(fromSqd(data?.totalBond), SQD_TOKEN, 3)}
            </WorkerColumnValue>
          </Grid>
          <Grid xxs={12}>
            <WorkerColumnLabel>Total delegation</WorkerColumnLabel>
            <WorkerColumnValue>
              {tokenFormatter(fromSqd(data?.totalDelegation), SQD_TOKEN, 3)}
            </WorkerColumnValue>
          </Grid>
        </Grid>
        <Grid container direction="row" xxs={12} xs={4}>
          <Grid xxs={6} xs={12}>
            <Box>
              <WorkerColumnLabel>Worker APR</WorkerColumnLabel>
              <WorkerColumnValue>{percentFormatter(data?.workerApr)}</WorkerColumnValue>
            </Box>
          </Grid>
          <Grid xxs={6} xs={12}>
            <Box>
              <WorkerColumnLabel>Delegator APR</WorkerColumnLabel>
              <WorkerColumnValue>{percentFormatter(data?.stakerApr)}</WorkerColumnValue>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" xxs={12} xs={4}>
          <Grid xxs={12}>
            <Box>
              <WorkerColumnLabel>Queries, 24h / 90d</WorkerColumnLabel>
              <WorkerColumnValue>
                {numberWithSpacesFormatter(data?.queries24Hours)} /{' '}
                {numberWithSpacesFormatter(data?.queries90Days)}
              </WorkerColumnValue>
            </Box>
          </Grid>
          <Grid xxs={12}>
            <Box>
              <WorkerColumnLabel>Data served, 24h / 90d</WorkerColumnLabel>
              <WorkerColumnValue>
                {bytesFormatter(data?.servedData24Hours)} / {bytesFormatter(data?.servedData90Days)}
              </WorkerColumnValue>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export function NetworkSummary() {
  const { isLoading } = useNetworkSummary();

  return (
    <>
      {!isLoading ? (
        <Grid container rowSpacing={2} columnSpacing={3} direction="row" sx={{ mb: 4 }}>
          <Grid xxs={12} xs={6}>
            <OnlineInfo />
          </Grid>
          <Grid xxs={12} xs={6}>
            <CurrentEpoch />
          </Grid>
          <Grid xxs={12}>
            <Stats />
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
}
