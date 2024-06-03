import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

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
  to,
}: {
  worker: Pick<BlockchainApiWorker, 'name' | 'peerId' | 'online'> & {
    totalDelegations?: BlockchainApiWorker['totalDelegations'];
  };
  to?: string;
}) => {
  return (
    <Stack spacing={2} direction="row">
      <Avatar
        // online={!!worker.online}
        name={worker.name || worker.peerId}
        colorDiscriminator={worker.peerId}
      />
      <Box>
        {worker.name ? (
          <Name>{worker.name.length > 40 ? worker.name.slice(0, 37) + '...' : worker.name}</Name>
        ) : null}
        <Stack direction="row" spacing={1}>
          <Box>
            <CopyToClipboard
              text={worker.peerId}
              content={
                <PeerIdShort>
                  <Link to={to || ''}>{shortPeerId(worker.peerId)}</Link>
                </PeerIdShort>
              }
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
