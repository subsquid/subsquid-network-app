import { useMemo } from 'react';

import { dateFormat } from '@i18n';
import { CircleRounded } from '@mui/icons-material';
import { Box, Chip as MaterialChip, Tooltip, chipClasses, styled } from '@mui/material';
import capitalize from 'lodash-es/capitalize';

import { WorkerStatus as Status, useCurrentEpoch, WorkerStatus } from '@api/subsquid-network-squid';
import { useCountdown } from '@hooks/useCountdown';

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

function AppliesTooltip({ timestamp }: { timestamp?: number }) {
  const timeLeft = useCountdown({ timestamp });

  return `Applies in ${timeLeft} (${dateFormat(timestamp, 'dateTime')})`;
}

export function WorkerStatusChip({
  worker,
}: {
  worker?: {
    status?: string;
    jailReason?: string;
    jailed?: boolean;
    online?: boolean;
    statusHistory?: {
      blockNumber: number;
      pending: boolean;
    }[];
  };
}) {
  const { label, color, tip } = useMemo((): {
    label: string;
    color: 'error' | 'warning' | 'success' | 'primary';
    tip?: string;
  } => {
    if (!worker) return { label: 'unknown', color: 'primary' };

    switch (worker.status) {
      case Status.Active:
        if (worker.jailed) {
          return { label: 'Jailed', color: 'warning', tip: worker.jailReason || 'Unknown' };
        } else if (!worker.online) {
          return { label: 'Offline', color: 'error' };
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
  }, [worker]);

  const { data: currentEpoch } = useCurrentEpoch();
  const applyTimestamp = useMemo(() => {
    if (!currentEpoch || !worker?.statusHistory?.length) return;

    const lastStatus = worker.statusHistory[worker.statusHistory.length - 1];
    if (!lastStatus.pending) return;

    return (
      new Date(currentEpoch.lastBlockTimestampL1).getTime() +
      (lastStatus.blockNumber - currentEpoch.lastBlockL1 + 1) * currentEpoch.blockTimeL1
    );
  }, [currentEpoch, worker]);

  const chip = (
    <Tooltip
      title={applyTimestamp ? <AppliesTooltip timestamp={applyTimestamp} /> : undefined}
      placement="top"
    >
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
    </Tooltip>
  );

  return tip ? (
    <Tooltip title={tip} placement="top">
      {chip}
    </Tooltip>
  ) : (
    chip
  );
}
