import { Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { Account, Worker, WorkerStatusFragmentFragment } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { SkeletonWrapper } from '@components/SkeletonWrapper';

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
  loading,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId' | 'name'>;
  owner: Pick<Account, 'id' | 'type'>;
  canEdit: boolean;
  loading?: boolean;
}) {
  const theme = useTheme();

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <SkeletonWrapper loading={loading} width={200}>
          <Typography variant="h4">{worker.name || worker.peerId}</Typography>
        </SkeletonWrapper>
        {canEdit ? <WorkerEdit worker={worker} owner={owner} disabled={!canEdit} /> : null}
      </Stack>
      <SkeletonWrapper loading={loading} width={300}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          <CopyToClipboard text={worker.peerId} content={<span>{worker.peerId}</span>} />
        </Typography>
      </SkeletonWrapper>
    </Stack>
  );
}

export const WorkerCard = ({
  worker,
  owner,
  canEdit,
  loading,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId' | 'name'> & WorkerStatusFragmentFragment;
  owner: Pick<Account, 'id' | 'type'>;
  canEdit: boolean;
  loading?: boolean;
}) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={2} direction="row" alignItems="center">
          <SkeletonWrapper loading={loading} variant="circular">
            <Avatar
              variant="circular"
              name={worker.name || worker.peerId}
              colorDiscriminator={worker.peerId}
              size={56}
            />
          </SkeletonWrapper>
          <WorkerTitle worker={worker} owner={owner} canEdit={canEdit} loading={loading} />
        </Stack>
        <Box>
          <WorkerStatusChip loading={loading} worker={worker} />
        </Box>
      </Stack>
    </>
  );
};
