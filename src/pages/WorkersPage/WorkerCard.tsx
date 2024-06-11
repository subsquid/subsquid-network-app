import { IconButton, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { Worker, WorkerStatusFragmentFragment } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { shortPeerId } from '@components/PeerId';
import { EditIcon } from '@icons/EditIcon';

import { WorkerStatus } from './WorkerStatus';

export const PeerIdRow = styled(Box, {
  name: 'PeerIdRow',
})(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  fontSize: '0.875rem',
  overflowWrap: 'anywhere',
}));

function WorkerTitle({
  worker,
  canEdit,
}: {
  worker: Pick<Worker, 'peerId' | 'name'>;
  canEdit: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ fontSize: '1.5rem', lineHeight: 1.4, overflowWrap: 'anywhere' }}>
        {worker.name || worker.peerId}
      </Box>
      {canEdit ? (
        <IconButton component={Link} to={`/workers/${worker.peerId}/edit`}>
          <EditIcon size={18} color="#1D1D1F" />
        </IconButton>
      ) : null}
    </Box>
  );
}

export const WorkerCard = ({
  worker,
  canEdit,
}: {
  worker: Pick<Worker, 'peerId' | 'name'> & WorkerStatusFragmentFragment;
  canEdit: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Stack spacing={3} direction="row">
      <Avatar
        variant="circular"
        name={worker.name || worker.peerId}
        colorDiscriminator={worker.peerId}
        size={100}
      />
      <Box sx={{ flex: 1 }}>
        <WorkerTitle worker={worker} canEdit={canEdit} />
        <PeerIdRow>
          <CopyToClipboard
            text={worker.peerId}
            content={isMobile ? shortPeerId(worker.peerId) : worker.peerId}
          />
        </PeerIdRow>
        <WorkerStatus worker={worker} />
      </Box>
    </Stack>
  );
};
