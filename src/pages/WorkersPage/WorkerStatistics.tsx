import React from 'react';

import {
  bytesFormatter,
  numberWithSpacesFormatter,
  percentFormatter,
} from '@lib/formatters/formatters.ts';
import { Box, Divider, Stack, styled } from '@mui/material';

import { BlockchainApiFullWorker } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Online } from '@components/Online';

import { UptimeGraph } from './UptimeGraph';

export const WorkerColumnLabel = styled(Box, {
  name: 'WorkerColumnLabel',
})(() => ({
  fontWeight: 500,
}));

export const WorkerColumn = styled(Box, {
  name: 'WorkerColumnLabel',
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
export const WorkerDescLabel = styled(Box, {
  name: 'WorkerDescLabel',
})(() => ({
  fontWeight: 500,
}));
export const WorkerDescValue = styled(Box, {
  name: 'WorkerDescValue',
})(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2),
}));

export const WorkerStatistics = ({ worker }: { worker: BlockchainApiFullWorker }) => {
  return (
    <Box>
      <Card noShadow title={<Box>Worker statistics</Box>}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <WorkerColumn>
            <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>
              <WorkerColumnLabel>APR</WorkerColumnLabel>
              <Box>{percentFormatter(worker.stakerApr)}</Box>
            </Stack>
          </WorkerColumn>
          {/*<WorkerColumn sx={{ flex: 2 }}>*/}
          {/*  <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>*/}
          {/*    <WorkerColumnLabel>Delegation capacity</WorkerColumnLabel>*/}
          {/*    <Box>*/}
          {/*      <WorkerDelegationCapacity value={worker.totalDelegations} />*/}
          {/*    </Box>*/}
          {/*  </Stack>*/}
          {/*</WorkerColumn>*/}
          <WorkerColumn>
            <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>
              <WorkerColumnLabel>Delegators</WorkerColumnLabel>
              <Box>{worker.delegationCount}</Box>
            </Stack>
          </WorkerColumn>
          <WorkerColumn>
            <Stack alignItems="center" direction="row" justifyContent="center" spacing={1}>
              <WorkerColumnLabel>Health</WorkerColumnLabel>
              <Box>
                <Online online={worker.online} />
              </Box>
            </Stack>
          </WorkerColumn>
        </Stack>
      </Card>

      <UptimeGraph worker={worker} />

      <WorkerDescTable>
        {/*<WorkerDescRow>*/}
        {/*  <WorkerDescLabel>Total worker rewards</WorkerDescLabel>*/}
        {/*  <WorkerDescValue>{worker.tot}</WorkerDescValue>*/}
        {/*</WorkerDescRow>*/}
        {/*<WorkerDescRow>*/}
        {/*  <WorkerDescLabel>Total delegators rewards</WorkerDescLabel>*/}
        {/*  <WorkerDescValue></WorkerDescValue>*/}
        {/*</WorkerDescRow>*/}
        <WorkerDescRow>
          <WorkerDescLabel>Queries, last 24 hours / last 90 days</WorkerDescLabel>
          <WorkerDescValue>
            {numberWithSpacesFormatter(worker.queries24Hours)} /{' '}
            {numberWithSpacesFormatter(worker.queries90Days)}
          </WorkerDescValue>
        </WorkerDescRow>
        <WorkerDescRow>
          <WorkerDescLabel>Data served, last 24 hours / last 90 days</WorkerDescLabel>
          <WorkerDescValue>
            {bytesFormatter(worker.servedData24Hours)} / {bytesFormatter(worker.servedData90Days)}
          </WorkerDescValue>
        </WorkerDescRow>
        <WorkerDescRow>
          <WorkerDescLabel>Data stored</WorkerDescLabel>
          <WorkerDescValue>{bytesFormatter(worker.storedData)}</WorkerDescValue>
        </WorkerDescRow>
      </WorkerDescTable>
    </Box>
  );
};
