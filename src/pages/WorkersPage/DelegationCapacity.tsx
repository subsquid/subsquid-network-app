import { percentFormatter } from '@lib/formatters/formatters';
import { Box, styled, Tooltip } from '@mui/material';
import classNames from 'classnames';

import { BlockchainApiWorker } from '@api/subsquid-network-squid';

export const Bar = styled(Box)(({ theme }) => ({
  width: theme.spacing(0.75),
  height: theme.spacing(2),
  borderRadius: '2px',
  background: '#EBEBEB',

  '&.error': {
    background: theme.palette.error.main,
  },

  '&.warning': {
    background: '#ffb801',
  },

  '&.success': {
    background: '#55AD44',
  },
}));

export const BarWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  '& :not(:last-child)': {
    marginRight: theme.spacing(0.25),
  },
}));

const BARS_COUNT = 8;
const RANGES = Array.from({ length: BARS_COUNT }, (_, i) => (i * 100) / BARS_COUNT);

export function DelegationCapacity({
  worker,
}: {
  worker: Pick<BlockchainApiWorker, 'delegationCapacity'>;
}) {
  const delegationCapacity = worker.delegationCapacity || 0;
  const color =
    delegationCapacity >= 75 ? 'error' : delegationCapacity >= 50 ? 'warning' : 'success';

  return (
    <Tooltip
      placement="right"
      title={<Box display="flex">{percentFormatter(delegationCapacity)}</Box>}
    >
      <BarWrapper>
        {RANGES.map((v, i) => (
          <Bar key={i} className={classNames(v < delegationCapacity ? color : undefined)} />
        ))}
      </BarWrapper>
    </Tooltip>
  );
}
