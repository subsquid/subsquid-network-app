import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { Worker } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { PeerIdShort, shortPeerId } from '@components/PeerId';

// import { WorkerDelegationCapacity } from './WorkerDelegationCapacity';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.25),
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

export const WorkerName = ({
  worker,
  to,
}: {
  worker: Pick<Worker, 'name' | 'peerId'>;
  to?: string;
}) => {
  return (
    <Stack spacing={1.5} direction="row" alignItems="center">
      <Avatar
        // online={!!worker.online}
        name={worker.name || worker.peerId}
        colorDiscriminator={worker.peerId}
      />
      <Box overflow="clip">
        {worker.name ? <Name>{worker.name}</Name> : null}
        <Stack direction="row" spacing={1} sx={{ fontSize: 14, lineHeight: '20px' }}>
          <Box>
            <CopyToClipboard
              text={worker.peerId}
              content={
                <PeerIdShort>
                  <Link to={to || '#'}>{shortPeerId(worker.peerId)}</Link>
                </PeerIdShort>
              }
            />
          </Box>
          {/* <WorkerDelegationCapacity worker={worker} /> */}
        </Stack>
      </Box>
    </Stack>
  );
};
