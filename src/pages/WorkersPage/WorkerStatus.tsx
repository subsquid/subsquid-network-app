import { useMemo } from 'react';

import { CircleRounded } from '@mui/icons-material';
import { Box, Chip as MaterialChip, Tooltip, chipClasses, styled } from '@mui/material';
import capitalize from 'lodash-es/capitalize';

import { WorkerStatus as Status, WorkerStatusFragmentFragment } from '@api/subsquid-network-squid';

export const Chip = styled(MaterialChip)(({ theme: { spacing } }) => ({
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1,
  height: 24,

  [`& .${chipClasses.label}`]: {
    padding: spacing(0, 1, 0, 0.5),
    margin: 0,
  },

  // [`& .${chipClasses.colorError}`]: {
  //   background: '#FFE6C0',
  //   color: '#FF6B35',
  // },

  // [`& .${chipClasses.colorSuccess}`]: {
  //   background: '#E3F7E0',
  //   color: '#55AD44',
  // },

  [`& .${chipClasses.icon}`]: {
    padding: spacing(0, 0, 0, 1),
    margin: 0,
  },
}));

export function WorkerStatus({ worker }: { worker: WorkerStatusFragmentFragment }) {
  const { label, color, tip } = useMemo((): {
    label: string;
    color: 'error' | 'success' | 'primary';
    tip?: string;
  } => {
    if (!worker.status) return { label: 'Unknown', color: 'primary' };

    switch (worker.status) {
      case Status.Active:
        if (worker.jailed) {
          return { label: 'Jailed', color: 'error', tip: worker.jailReason || 'Unknown' };
        } else if (!worker.online) {
          return { label: 'Offline', color: 'primary' };
        }

        return { label: 'Online', color: 'success' };
      case Status.Registering:
        return { label: 'Registering', color: 'primary' };
      case Status.Deregistering:
        return { label: 'Deregistering', color: 'primary' };
      case Status.Deregistered:
        return { label: 'Deregistered', color: 'primary' };
    }

    return { label: capitalize(worker.status), color: 'primary' };
  }, [worker.jailReason, worker.jailed, worker.online, worker.status]);

  const chip = (
    <Chip
      color={color}
      label={label}
      icon={
        <Box display="flex" justifyContent="center">
          <CircleRounded sx={{ fontSize: 8 }} />
        </Box>
      }
    />
  );

  return tip ? (
    <Tooltip title={tip} placement="top">
      {chip}
    </Tooltip>
  ) : (
    chip
  );
}
