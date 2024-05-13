import React from 'react';

import { Chip as MaterialChip, chipClasses, styled } from '@mui/material';
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
} {
  if (!worker.status) return { label: 'Unknown', color: 'default' };

  switch (worker.status) {
    case Status.Active:
      if (worker.jailed) {
        return { label: 'Jailed', color: 'error' };
      } else if (!worker.online) {
        return { label: 'Offline', color: 'default' };
      }

      return { label: 'Online', color: 'success' };
    case Status.Registering:
      return { label: 'Registering', color: 'default' };
    case Status.Deregistering:
      return { label: 'Unregistring', color: 'default' };
    case Status.Deregistered:
      return { label: 'Deregistered', color: 'default' };
  }

  return { label: capitalize(worker.status), color: 'default' };
}

export function WorkerStatus({ worker }: { worker: BlockchainApiWorker }) {
  const { label, color } = workerStatus(worker);

  return <Chip color={color} label={label} />;
}
