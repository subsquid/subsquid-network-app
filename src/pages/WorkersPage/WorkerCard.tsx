import React from 'react';

import { dateFormat } from '@i18n';
import { Divider, IconButton, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import {
  BlockchainApiFullWorker,
  WorkerStatus as BlockchainWorkerStatus,
} from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { EditIcon } from '@icons/EditIcon';

import { WorkerDelegate } from './WorkerDelegate';
import { WorkerStatus } from './WorkerStatus';
import { WorkerUndelegate } from './WorkerUndelegate';

export const WorkerDescLabel = styled(Box, {
  name: 'WorkerDescLabel',
})(({ theme }) => ({
  color: theme.palette.text.primary,
}));
export const WorkerDescValue = styled(Box, {
  name: 'WorkerDescValue',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
export const PeerIdRow = styled(Box, {
  name: 'PeerIdRow',
})(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  color: theme.palette.importantLink.main,
  fontSize: '0.875rem',
}));

export const WorkerDescription = styled(Box, {
  name: 'WorkerDescription',
})(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
}));

function WorkerTitle({ worker }: { worker: BlockchainApiFullWorker }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ fontSize: '1.5rem', lineHeight: 1.4 }}>{worker.name || worker.peerId}</Box>
      <Box sx={{ flex: 1, ml: 1 }}>
        <WorkerStatus worker={worker} />
      </Box>
      <Stack direction="row" spacing={2}>
        {worker.status === BlockchainWorkerStatus.Active ? (
          <WorkerDelegate worker={worker} />
        ) : null}
        {worker.myDelegationsTotal.greaterThan(0) ? <WorkerUndelegate worker={worker} /> : null}
        {worker.ownedByMe ? (
          <Link to={`/profile/workers/${worker.peerId}/edit`}>
            <IconButton>
              <EditIcon size={18} color="#1D1D1F" />
            </IconButton>
          </Link>
        ) : null}
      </Stack>
    </Box>
  );
}

export const WorkerCard = ({ worker }: { worker: BlockchainApiFullWorker }) => {
  return (
    <Box>
      <Stack spacing={3} direction="row">
        <Avatar
          variant="rounded"
          name={worker.name || worker.peerId}
          colorDescriminator={worker.peerId}
          size={130}
        />
        <Box sx={{ flex: 1 }}>
          <WorkerTitle worker={worker} />
          <Divider sx={{ my: 1 }} />
          <WorkerDescription>{worker.description}</WorkerDescription>
          <Box>
            <PeerIdRow>
              <CopyToClipboard text={worker.peerId} content={worker.peerId} />
            </PeerIdRow>
          </Box>

          <Divider sx={{ my: 1 }} />
          <Stack spacing={1} direction="row" justifyContent="space-between">
            {/*<Stack direction="row" spacing={1}>*/}
            {/*  <WorkerDescLabel>Website</WorkerDescLabel>*/}
            {/*  <WorkerDescValue>{worker.website || '-'}</WorkerDescValue>*/}
            {/*</Stack>*/}
            {/*<Stack direction="row" spacing={1}>*/}
            {/*  <WorkerDescLabel>Contact</WorkerDescLabel>*/}
            {/*  <WorkerDescValue>{worker.email || '-'}</WorkerDescValue>*/}
            {/*</Stack>*/}
            {/*<Stack direction="row" spacing={1}>*/}
            {/*  <WorkerDescLabel>Version</WorkerDescLabel>*/}
            {/*  <WorkerDescValue>-</WorkerDescValue>*/}
            {/*</Stack>*/}
            <Stack direction="row" spacing={1}>
              <WorkerDescLabel>Joined</WorkerDescLabel>
              <WorkerDescValue>{dateFormat(worker.createdAt)}</WorkerDescValue>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
