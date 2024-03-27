import React from 'react';

import { Box, Divider, Stack, styled } from '@mui/material';

import { formatSqd } from '@api/contracts/utils';
import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';

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
  return (
    <Card noShadow title="My bond and rewards">
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          <MyWorkerLabel>My Bond</MyWorkerLabel>
          <MyWorkerValue>{formatSqd(worker.bond)}</MyWorkerValue>
        </Box>
        <Box>
          <MyWorkerLabel>My total rewards</MyWorkerLabel>
          <MyWorkerValue>{formatSqd(worker.claimedReward)}</MyWorkerValue>
        </Box>
        <Box>
          <MyWorkerLabel>Claimable rewards</MyWorkerLabel>
          <MyWorkerValue>{formatSqd(worker.claimableReward)}</MyWorkerValue>
        </Box>
      </Stack>
    </Card>
  );
};
