import React from 'react';

import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';

import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { PeerIdShort, shortPeerId } from '@components/PeerId';

// import { WorkerDelegationCapacity } from './WorkerDelegationCapacity';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
  whiteSpace: 'nowrap',
}));

export const WorkerName = ({
  worker,
}: {
  worker: Pick<BlockchainApiWorker, 'name' | 'peerId' | 'online'> & {
    totalDelegations?: BlockchainApiWorker['totalDelegations'];
  };
}) => {
  return (
    <Stack spacing={2} direction="row">
      <Avatar
        // online={!!worker.online}
        name={worker.name || worker.peerId}
        colorDescriminator={worker.peerId}
      />
      <Box>
        {worker.name ? (
          <Name>{worker.name.length > 50 ? worker.name.slice(0, 47) + '...' : worker.name}</Name>
        ) : null}
        <Stack direction="row" spacing={1}>
          <Box>
            <CopyToClipboard
              text={worker.peerId}
              content={<PeerIdShort>{shortPeerId(worker.peerId)}</PeerIdShort>}
            />
          </Box>
          {/*{worker.totalDelegations ? (*/}
          {/*  <WorkerDelegationCapacity value={worker.totalDelegations} />*/}
          {/*) : null}*/}
        </Stack>
      </Box>
    </Stack>
  );
};
