import React from 'react';

import { Chip as MaterialChip, Tooltip, chipClasses, styled } from '@mui/material';
import capitalize from 'lodash-es/capitalize';

import { BlockchainApiWorker, WorkerStatus as Status } from '@api/subsquid-network-squid';

export const Chip = styled(MaterialChip)(({ theme: { spacing } }) => ({
  fontSize: '0.75rem',
  fontWeight: 500,
  lineHeight: 1,
  height: 24,

  [`& .${chipClasses.label}`]: {
    padding: spacing(0.5, 1),
  },

  [`&.${chipClasses.colorError}`]: {
    background: '#FFE6C0',
    color: '#FF6B35',
  },

  [`&.${chipClasses.colorSuccess}`]: {
    background: '#E3F7E0',
    color: '#55AD44',
  },
}));

export function workerStatus(worker: BlockchainApiWorker): {
  label: string;
  color: 'error' | 'success' | 'default';
  tip?: string;
} {
  if (!worker.status) return { label: 'Unknown', color: 'default' };

  switch (worker.status) {
    case Status.Active:
      if (worker.jailed) {
        return { label: 'Jailed', color: 'error', tip: worker.jailReason || 'Unknown' };
      } else if (!worker.online) {
        return {
          label: 'Offline',
          color: 'default',
          tip: worker.dialOk === false ? 'Unreachable' : undefined,
        };
      }

      return { label: 'Online', color: 'success' };
    case Status.Registering:
      return { label: 'Registering', color: 'default' };
    case Status.Deregistering:
      return { label: 'Deregistering', color: 'default' };
    case Status.Deregistered:
      return { label: 'Deregistered', color: 'default' };
  }

  return { label: capitalize(worker.status), color: 'default' };
}

export function WorkerStatus({ worker }: { worker: BlockchainApiWorker }) {
  const { label, color, tip } = workerStatus(worker);

  const chip = <Chip color={color} label={label} />;

  return tip ? (
    <Tooltip title={tip} placement="top">
      {chip}
    </Tooltip>
  ) : (
    chip
  );
}
