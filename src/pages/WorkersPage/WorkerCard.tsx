import { Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { Account, Worker, WorkerStatusFragmentFragment } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';

import { WorkerEdit } from './WorkerEdit';
import { WorkerStatusChip } from './WorkerStatus';

// export const PeerIdRow = styled(Box, {
//   name: 'PeerIdRow',
// })(({ theme }) => ({
//   marginTop: theme.spacing(0.5),
//   // marginBottom: theme.spacing(1.5),
//   overflowWrap: 'anywhere',
// }));

function WorkerTitle({
  worker,
  owner,
  canEdit,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId' | 'name'>;
  owner: Pick<Account, 'id' | 'type'>;
  canEdit: boolean;
}) {
  const theme = useTheme();

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="h4" sx={{ overflowWrap: 'anywhere' }}>
          {worker.name || worker.peerId}
        </Typography>
        {canEdit ? <WorkerEdit worker={worker} owner={owner} disabled={!canEdit} /> : null}
      </Stack>
      <Typography
        variant="body2"
        sx={{ overflowWrap: 'anywhere', color: theme.palette.text.secondary }}
      >
        <CopyToClipboard text={worker.peerId} content={<span>{worker.peerId}</span>} />
      </Typography>
    </Stack>
  );
}

export const WorkerCard = ({
  worker,
  owner,
  canEdit,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId' | 'name'> & WorkerStatusFragmentFragment;
  owner: Pick<Account, 'id' | 'type'>;
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
          <WorkerTitle worker={worker} owner={owner} canEdit={canEdit} />
        </Stack>
        <Box>
          <WorkerStatusChip worker={worker} />
        </Box>
      </Stack>
    </>
  );
};
