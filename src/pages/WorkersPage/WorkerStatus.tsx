import { useMemo } from 'react';

import { CircleRounded } from '@mui/icons-material';
import { Box, Chip as MaterialChip, Tooltip, chipClasses, styled } from '@mui/material';
import capitalize from 'lodash-es/capitalize';

import { WorkerStatus as Status, WorkerStatusFragmentFragment } from '@api/subsquid-network-squid';

export const Chip = styled(MaterialChip)(({ theme }) => ({
  // [`&.${chipClasses.colorSuccess}`]: {
  //   background: theme.palette.success.background,
  //   color: theme.palette.success.main,
  // },
  // [`&.${chipClasses.colorError}`]: {
  //   background: theme.palette.error.background,
  //   color: theme.palette.error.main,
  // },
  [`&.${chipClasses.colorPrimary}`]: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.contrastText,
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
      variant="outlined"
      icon={
        <Box display="flex" justifyContent="center">
          <CircleRounded sx={{ fontSize: 7 }} />
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
