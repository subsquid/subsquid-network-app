import React from 'react';

import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, Divider, Stack, styled } from '@mui/material';
import Decimal from 'decimal.js';

import { formatSqd } from '@api/contracts/utils';
import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { useContracts } from '@network/useContracts';

import { WorkerColumn, WorkerColumnLabel } from './WorkerStatistics';

export const MyWorkerLabel = styled(Box, {
  name: 'MyWorkerLabel',
})(({ theme }) => ({
  color: theme.palette.text.primary,
}));
export const MyWorkerValue = styled(Box, {
  name: 'MyWorkerValue',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const MyWorkerStat = ({ worker }: { worker: BlockchainApiWorker }) => {
  const { SQD_TOKEN } = useContracts();

  return (
    <Card noShadow title="My bond and rewards">
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <WorkerColumn>
          <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>
            <WorkerColumnLabel>Worker APR</WorkerColumnLabel>
            <Box>{percentFormatter(worker.apr)}</Box>
          </Stack>
        </WorkerColumn>
        <WorkerColumn>
          <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>
            <WorkerColumnLabel>Bond</WorkerColumnLabel>
            <Box>{formatSqd(SQD_TOKEN, worker.bond)}</Box>
          </Stack>
        </WorkerColumn>
        <WorkerColumn>
          <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>
            <WorkerColumnLabel>Total rewards</WorkerColumnLabel>
            <Box>
              {formatSqd(SQD_TOKEN, new Decimal(worker.claimedReward).add(worker.claimableReward))}
            </Box>
          </Stack>
        </WorkerColumn>
      </Stack>
    </Card>
  );
};
