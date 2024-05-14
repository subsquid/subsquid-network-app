import React from 'react';

import {
  bytesFormatter,
  numberWithSpacesFormatter,
  percentFormatter,
} from '@lib/formatters/formatters.ts';
import { Box, Divider, Stack, styled } from '@mui/material';

import { formatSqd } from '@api/contracts/utils';
import { BlockchainApiFullWorker } from '@api/subsquid-network-squid';
import { useContracts } from '@network/useContracts';

import { UptimeGraph } from './UptimeGraph';

export const WorkerDescLabel = styled(Box, {
  name: 'WorkerDescLabel',
})(({ theme }) => ({
  flex: 1,
  fontWeight: 500,
  whiteSpace: 'balance',
  maxWidth: theme.spacing(25),
}));

export const WorkerColumn = styled(Box, {
  name: 'WorkerDescLabel',
})(() => ({
  flex: 1,
}));

export const WorkerDescTable = styled(Box, {
  name: 'WorkerDescTable',
})(() => ({
  flex: 1,
}));

export const WorkerDescRow = styled(Box, {
  name: 'WorkerDescRow',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  margin: theme.spacing(5, 0),
  lineHeight: 1.4,
}));

export const WorkerDescValue = styled(Box, {
  name: 'WorkerDescValue',
})(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2),
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  lineHeight: 1,
  marginBottom: theme.spacing(5),
}));

export const WorkerStatistics = ({ worker }: { worker: BlockchainApiFullWorker }) => {
  const { SQD_TOKEN } = useContracts();

  return (
    <Stack spacing={4} divider={<Divider orientation="horizontal" flexItem />}>
      <Box>
        <Title>Bond</Title>
        <Stack spacing={2}>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Worker APR, 7d</WorkerDescLabel>
            <WorkerDescValue>
              {worker.apr != null ? percentFormatter(worker.apr) : '-'}
            </WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Bonded</WorkerDescLabel>
            <WorkerDescValue>{formatSqd(SQD_TOKEN, worker.bond, 8)}</WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Total rewards</WorkerDescLabel>
            <WorkerDescValue>{formatSqd(SQD_TOKEN, worker.totalReward, 8)}</WorkerDescValue>
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Title>Delegation</Title>
        <Stack spacing={2}>
          <Stack direction="row">
            <WorkerDescLabel>Delegator APR, 7d</WorkerDescLabel>
            <WorkerDescValue>
              {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
            </WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Delegators</WorkerDescLabel>
            <WorkerDescValue>{worker.delegationCount}</WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Total delegated</WorkerDescLabel>
            <WorkerDescValue>{formatSqd(SQD_TOKEN, worker.totalDelegation, 8)}</WorkerDescValue>
          </Stack>
        </Stack>
      </Box>

      <Box>
        <Title>Statistics</Title>
        <Stack spacing={2}>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Uptime, 24h / 90d</WorkerDescLabel>
            <WorkerDescValue>
              {percentFormatter(worker.uptime24Hours)} / {percentFormatter(worker.uptime90Days)}
            </WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Queries, 24h / 90d</WorkerDescLabel>
            <WorkerDescValue>
              {numberWithSpacesFormatter(worker.queries24Hours)} /{' '}
              {numberWithSpacesFormatter(worker.queries90Days)}
            </WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Data served, 24h / 90d</WorkerDescLabel>
            <WorkerDescValue>
              {bytesFormatter(worker.servedData24Hours)} / {bytesFormatter(worker.servedData90Days)}
            </WorkerDescValue>
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="center">
            <WorkerDescLabel>Data stored</WorkerDescLabel>
            <WorkerDescValue>{bytesFormatter(worker.storedData)}</WorkerDescValue>
          </Stack>
        </Stack>

        <UptimeGraph worker={worker} />
      </Box>
    </Stack>
  );
};
