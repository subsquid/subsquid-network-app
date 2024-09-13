import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { Worker, WorkerStatusFragmentFragment } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { EditIcon } from '@icons/EditIcon';

import { WorkerStatus } from './WorkerStatus';

// export const PeerIdRow = styled(Box, {
//   name: 'PeerIdRow',
// })(({ theme }) => ({
//   marginTop: theme.spacing(0.5),
//   // marginBottom: theme.spacing(1.5),
//   overflowWrap: 'anywhere',
// }));

function WorkerTitle({
  worker,
  canEdit,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId' | 'name'>;
  canEdit: boolean;
}) {
  const theme = useTheme();

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="h4" sx={{ overflowWrap: 'anywhere' }}>
          {worker.name || worker.peerId}
        </Typography>
        {canEdit ? (
          <IconButton component={Link} to={`/workers/${worker.peerId}/edit`} sx={{ padding: 0.5 }}>
            <EditIcon />
          </IconButton>
        ) : null}
      </Stack>
      <CopyToClipboard
        text={worker.peerId}
        content={
          <Typography
            variant="body2"
            sx={{ overflowWrap: 'anywhere', color: theme.palette.text.secondary }}
          >
            {worker.peerId}
          </Typography>
        }
      />
    </Stack>
  );
}

export const WorkerCard = ({
  worker,
  canEdit,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId' | 'name'> & WorkerStatusFragmentFragment;
  canEdit: boolean;
}) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar
            variant="circular"
            name={worker.name || worker.peerId}
            colorDiscriminator={worker.peerId}
            size={56}
          />
          {/* <Stack justifyContent="stretch" flex={1} spacing={0.125}> */}
          <WorkerTitle worker={worker} canEdit={canEdit} />

          {/* </Stack> */}
        </Stack>
        <Box>
          <WorkerStatus worker={worker} />
        </Box>
      </Stack>
    </>
  );
};
