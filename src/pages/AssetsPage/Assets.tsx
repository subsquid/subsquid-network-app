import React, { useMemo } from 'react';

import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network/utils';
import { CircleRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BigNumber from 'bignumber.js';
import { Cell, Pie, PieChart } from 'recharts';

import {
  AccountType,
  ClaimType,
  useSourcesWithAssetsQuery,
  useSquid,
  Worker,
} from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { HelpTooltip } from '@components/HelpTooltip';
import { useAccount } from '@network/useAccount';
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

function TokenBalance({ sx, balance }: { sx?: SxProps<Theme>; balance?: TokenBalance }) {
  const { SQD_TOKEN } = useContracts();

  return (
    <Box sx={sx}>
      <ColumnLabel color={balance?.color}>
        <HelpTooltip title={balance?.tip}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CircleRounded sx={{ fontSize: 11 }} />
            <span>{balance?.name}</span>
          </Stack>
        </HelpTooltip>
      </ColumnLabel>
      <ColumnValue>{tokenFormatter(fromSqd(balance?.value), SQD_TOKEN, 3)}</ColumnValue>
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
      {/* <Box display="flex" pr={7} pb={3} alignItems="center">
        <PieChart
          series={[
            {
              data: balances.map(i => ({ id: i.name, value: i.value.toNumber(), color: i.color })),
              outerRadius: 120,
              innerRadius: 60,
              valueFormatter: v => tokenFormatter(v.value, SQD_TOKEN, 3),
              cx: 128,
              cy: 128,
            },
          ]}
          width={256}
          height={256}
          skipAnimation
        />
      </Box> */}
      <Box mb={4} mr={7}>
        <PieChart width={240} height={240}>
          <Pie
            data={balances.map(i => ({ name: i.name, value: i.value.toNumber() }))}
            animationDuration={0}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            nameKey="name"
            dataKey="value"
            style={{ outline: 'none' }}
          >
            {balances.map(i => (
              <Cell key={i.name} fill={i.color} strokeWidth={0} />
            ))}
          </Pie>
        </PieChart>
      </Box>

      <Box mb={1}>
        <SquaredChip label="Total" color="primary" />
      </Box>
      <Typography variant="h2" textAlign="end">
        {tokenFormatter(total, SQD_TOKEN, 3)}
      </Typography>
    </Box>
  );
}

export function MyAssets() {
  const theme = useTheme();
  const narrowXs = useMediaQuery(theme.breakpoints.down('xs'));
  const narrowSm = useMediaQuery(theme.breakpoints.down('sm'));

  const account = useAccount();
  const squid = useSquid();

  const { data: sourcesQuery, isLoading: isSourcesLoading } = useSourcesWithAssetsQuery(squid, {
    address: account.address || '0x',
  });

  const isLoading = isSourcesLoading;

  const balances = useMemo((): TokenBalance[] => {
    const transferable: TokenBalance = {
      name: 'Transferable',
      value: BigNumber(0),
      color: theme.palette.success.main,
      background: theme.palette.success.background,
      tip: 'Liquid tokens, can be freely transferred to external addresses',
    };
    const vesting: TokenBalance = {
      name: 'Vesting',
      value: BigNumber(0),
      color: theme.palette.warning.main,
      background: theme.palette.warning.background,
      tip: 'Tokens locked in the vesting contracts owned by the wallet. Can be used for bonding (running a worker) and/or delegation',
    };
    const claimable: TokenBalance = {
      name: 'Claimable',
      value: BigNumber(0),
      color: theme.palette.info.main,
      background: theme.palette.info.background,
      tip: 'Earned but not yet claimed token rewards, aggregated across all workers and delegations',
    };
    const bonded: TokenBalance = {
      name: 'Bonded',
      value: BigNumber(0),
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
      tip: 'Tokens bonded in the worker registry contract',
    };
    const delegated: TokenBalance = {
      name: 'Delegated',
      value: BigNumber(0),
      color: theme.palette.secondary.contrastText,
      background: theme.palette.secondary.main,
      tip: 'Tokens delegated to workers',
    };

    sourcesQuery?.accounts.forEach(s => {
      if (s.type === AccountType.User) {
        transferable.value = transferable.value.plus(s.balance);
      } else if (s.type === AccountType.Vesting) {
        vesting.value = vesting.value.plus(s.balance);
      }

      s.delegations2.forEach(d => {
        delegated.value = delegated.value.plus(d.deposit);
        claimable.value = claimable.value.plus(d.claimableReward);
      });

      s.workers2.forEach(w => {
        bonded.value = bonded.value.plus(w.bond);
        claimable.value = claimable.value.plus(w.claimableReward);
      });
    });

    return [transferable, vesting, claimable, bonded, delegated];
  }, [sourcesQuery?.accounts, theme.palette]);

  const totalBalance = useMemo(() => {
    return balances.reduce((a, b) => a.plus(b.value), BigNumber(0));
  }, [balances]);

  const claimableSources = useMemo(() => {
    if (!sourcesQuery?.accounts) return;

    return sourcesQuery.accounts.map(s => {
      const claims: (Pick<Worker, 'id' | 'peerId' | 'name'> & {
        type: ClaimType;
        claimableReward: string;
      })[] = [];

      s.delegations2.forEach(d => {
        if (d.claimableReward === '0') return;

        claims.push({
          id: d.worker.id,
          peerId: d.worker.peerId,
          name: d.worker.name,
          claimableReward: d.claimableReward,
          type: ClaimType.Delegation,
        });
      });

      s.workers2.forEach(w => {
        if (w.claimableReward === '0') return;

        claims.push({
          id: w.id,
          peerId: w.peerId,
          name: w.name,
          claimableReward: w.claimableReward,
          type: ClaimType.Worker,
        });
      });

      const totalClaimableBalance = claims.reduce(
        (t, i) => t.plus(i.claimableReward),
        BigNumber(0),
      );

      return {
        id: s.id,
        type: s.type,
        balance: totalClaimableBalance.toString(),
        claims: claims.sort(
          (a, b) => BigNumber(a.claimableReward).comparedTo(b.claimableReward) * -1,
        ),
      };
    });
  }, [sourcesQuery?.accounts]);

  const hasAvailableClaims = useMemo(
    () => !!claimableSources?.some(s => s.balance !== '0'),
    [claimableSources],
  );

  return (
    <Box minHeight={448} mb={2} display="flex">
      <SummarySection
        loading={isLoading}
        sx={{ width: 1 }}
        title={<SquaredChip label="My Assets" color="primary" />}
        action={
          <ClaimButton sources={claimableSources} disabled={isLoading || !hasAvailableClaims} />
        }
      >
        <Grid container spacing={2} disableEqualOverflow flex={1}>
          <Grid xxs={12} sm={8}>
            <Stack
              divider={<Divider flexItem />}
              spacing={1}
              direction={narrowXs ? 'column' : 'row'}
              alignItems={narrowXs ? 'stretch' : 'flex-end'}
              height={1}
              justifyContent="stretch"
            >
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <TokenBalance balance={balances[0]} />
                <TokenBalance balance={balances[1]} />
                <TokenBalance balance={balances[2]} />
              </Stack>
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <TokenBalance balance={balances[3]} />
                <TokenBalance balance={balances[4]} />
              </Stack>
            </Stack>
          </Grid>
          {narrowSm ? null : (
            <Grid xxs={0} sm={4}>
              <Box display="flex" alignItems="flex-end" height={1}>
                <TotalBalance balances={balances} total={fromSqd(totalBalance)} />
              </Box>
            </Grid>
          )}
        </Grid>
      </SummarySection>
    </Box>
  );
}
