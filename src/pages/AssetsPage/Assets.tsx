import React, { useMemo } from 'react';

import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network/utils';
import { CircleRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BigNumber from 'bignumber.js';

import { useMyAssets } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { useContracts } from '@network/useContracts';
import { ColumnLabel, ColumnValue, SummarySection } from '@pages/DashboardPage/Summary';

import { ClaimButton } from './ClaimButton';

type TokenBalance = {
  name: string;
  value: BigNumber;
  color: string;
  background: string;
  tip?: string;
};

const TokenBalanceList = styled(Box, {
  name: 'TokenBalanceList',
})(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
}));

function TokenBalance({ sx, balance }: { sx?: SxProps<Theme>; balance?: TokenBalance }) {
  const { SQD_TOKEN } = useContracts();

  return (
    <Box sx={sx}>
      <ColumnLabel color={balance?.color}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CircleRounded sx={{ fontSize: 11 }} />
          <Box>{balance?.name}</Box>
          <HelpTooltip title={balance?.tip} />
        </Stack>
      </ColumnLabel>
      <ColumnValue>{tokenFormatter(balance?.value || 0, SQD_TOKEN, 3)}</ColumnValue>
    </Box>
  );
}

function TotalBalance({ balances, total }: { balances: TokenBalance[]; total: BigNumber }) {
  const { SQD_TOKEN } = useContracts();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="flex-end"
      flex={1}
    >
      {/* <PieChart width={210} height={210}>
        <Pie
          data={balances.map(i => ({ name: i.name, value: i.value.toNumber() }))}
          animationBegin={0}
          animationDuration={0}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={105}
          nameKey="name"
          dataKey="value"
        >
          {balances.map(i => (
            <Cell
              onClick={e => {
                e.preventDefault();
              }}
              key={i.name}
              fill={i.background}
            />
          ))}
        </Pie>
      </PieChart> */}
      <Box mb={1}>
        <SquaredChip label="Total" color="primary" />
      </Box>
      <Typography variant="h2">{tokenFormatter(total, SQD_TOKEN, 3)}</Typography>
    </Box>
  );
}

export function MyAssets() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { isLoading, assets } = useMyAssets();

  const data = useMemo(
    (): TokenBalance[] => [
      {
        name: 'Transferable',
        value: fromSqd(assets.balance),
        color: theme.palette.success.main,
        background: theme.palette.success.background,
        tip: 'Liquid tokens, can be freely transferred to external addresses',
      },
      {
        name: 'Locked',
        value: fromSqd(assets.locked),
        color: theme.palette.warning.main,
        background: theme.palette.warning.background,
        tip: 'Tokens locked in the vesting contracts owned by the wallet. Can be used for bonding (running a worker) and/or delegation',
      },
      {
        name: 'Claimable',
        value: fromSqd(assets.claimable),
        color: theme.palette.info.main,
        background: theme.palette.info.background,
        tip: 'Earned but not yet claimed token rewards, aggregated across all workers and delegations',
      },
      {
        name: 'Bonded',
        value: fromSqd(assets.bonded),
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
        tip: 'Tokens bonded in the worker registry contract. 100000 SQD has to be bonded per a worker node',
      },
      {
        name: 'Delegated',
        value: fromSqd(assets.delegated),
        color: theme.palette.secondary.contrastText,
        background: theme.palette.secondary.main,
        tip: 'Tokens delegated to workers',
      },
    ],
    [
      assets.balance,
      assets.bonded,
      assets.claimable,
      assets.delegated,
      assets.locked,
      theme.palette,
    ],
  );

  return (
    <Box minHeight={448} mb={2}>
      {isLoading ? (
        <Loader />
      ) : (
        <SummarySection
          sx={{ minHeight: 'inherit' }}
          title={<SquaredChip label="My Assets" color="primary" />}
          action={<ClaimButton />}
          content={
            <Grid container spacing={2} disableEqualOverflow>
              <Grid xxs={4}>
                <Stack divider={<Divider />} spacing={1} flex={1} justifyContent="flex-end">
                  <TokenBalance balance={data[0]} />
                  <TokenBalance balance={data[1]} />
                  <TokenBalance balance={data[2]} />
                </Stack>
              </Grid>
              <Grid xxs={4} display="flex" alignContent="stretch">
                <Stack divider={<Divider />} spacing={1} flex={1} justifyContent="flex-end">
                  <TokenBalance balance={data[3]} />
                  <TokenBalance balance={data[4]} />
                </Stack>
              </Grid>
              <Grid xxs={4} display="flex" alignContent="stretch">
                <TotalBalance balances={data} total={fromSqd(assets.total)} />
              </Grid>
            </Grid>
          }
        />
      )}
    </Box>
  );
}
