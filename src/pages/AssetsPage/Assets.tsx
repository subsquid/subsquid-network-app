import { useMemo } from 'react';

import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network/utils';
import { CircleRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { Cell, Pie, PieChart } from 'recharts';
import { alpha } from '@mui/material/styles';

import {
  AccountType,
  ClaimType,
  useSourcesWithAssetsQuery,
  useSquid,
  Worker,
} from '@api/subsquid-network-squid';
import { SquaredChip } from '@components/Chip';
import { HelpTooltip } from '@components/HelpTooltip';
import { demoFeaturesEnabled } from '@hooks/demoFeaturesEnabled';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { ColumnLabel, ColumnValue, SummarySection } from '@pages/DashboardPage/Summary';

import { ClaimButton } from './ClaimButton';
import { SkeletonWrapper } from '@components/SkeletonWrapper';

type TokenBalance = {
  name: string;
  value: BigNumber;
  color: string;
  background: string;
  tip?: string;
};

function TokenBalance({
  sx,
  balance,
  loading,
}: { sx?: SxProps<Theme>; balance?: TokenBalance; loading?: boolean }) {
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
      <SkeletonWrapper loading={loading} width={320}>
        <ColumnValue>{tokenFormatter(fromSqd(balance?.value), SQD_TOKEN, 3)}</ColumnValue>
      </SkeletonWrapper>
    </Box>
  );
}

function TotalBalance({
  balances,
  total,
  loading,
}: { balances: TokenBalance[]; total: BigNumber; loading?: boolean }) {
  const { SQD_TOKEN } = useContracts();
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="flex-end"
      flex={1}
    >
      <Box mb={4} mr={7} position="relative" width={240} height={240}>
        {loading ? (
          <>
            <style>
              {`
                @keyframes skeleton-pulse {
                  0% { opacity: 1; }
                  50% { opacity: 0.4; }
                  100% { opacity: 1; }
                }
              `}
            </style>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: alpha(
                  theme.palette.action.active,
                  theme.palette.action.activatedOpacity,
                ),
                animation: 'skeleton-pulse 2s ease-in-out 0.5s infinite',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '50%',
                  height: '50%',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.background.paper,
                },
                opacity: 0,
                animationDelay: '0.6s',
              }}
            />
          </>
        ) : (
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
        )}
      </Box>

      <Box mb={1}>
        <SquaredChip label="Total" color="primary" />
      </Box>
      <SkeletonWrapper loading={loading} width={320}>
        <Typography variant="h2" textAlign="end">
          {tokenFormatter(total, SQD_TOKEN, 3)}
        </Typography>
      </SkeletonWrapper>
    </Box>
  );
}

export function MyAssets() {
  const theme = useTheme();
  const narrowXs = useMediaQuery(theme.breakpoints.down('sm'));
  const narrowSm = useMediaQuery(theme.breakpoints.down('md'));

  const account = useAccount();
  const squid = useSquid();

  const { data: sourcesQuery, isLoading: isSourcesLoading } = useSourcesWithAssetsQuery({
    address: account.address || '0x',
  });

  const isLoading = isSourcesLoading;

  const balances = useMemo((): TokenBalance[] => {
    const transferable: TokenBalance = {
      name: 'Transferable',
      value: BigNumber(0),
      color: theme.palette.success.main,
      background: theme.palette.success.main,
      tip: 'Liquid tokens, can be freely transferred to external addresses',
    };
    const vesting: TokenBalance = {
      name: 'Vesting',
      value: BigNumber(0),
      color: theme.palette.warning.main,
      background: theme.palette.warning.main,
      tip: 'Tokens locked in the vesting contracts owned by the wallet. Can be used for bonding (running a worker) and/or delegation',
    };
    const claimable: TokenBalance = {
      name: 'Claimable',
      value: BigNumber(0),
      color: theme.palette.info.main,
      background: theme.palette.info.main,
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
    const lockedPortal: TokenBalance = {
      name: 'Locked in Portal',
      value: BigNumber(0),
      color: theme.palette.text.primary,
      background: theme.palette.text.primary,
      tip: 'Tokens locked in Portal stake',
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

      s.gatewayStakes.forEach(gs => {
        lockedPortal.value = bonded.value.plus(gs.amount);
      });
    });

    return [transferable, vesting, claimable, bonded, delegated, lockedPortal];
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
          (a, b) => BigNumber(a.claimableReward).comparedTo(b.claimableReward)! * -1,
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
        sx={{ width: 1 }}
        title={<SquaredChip label="My Assets" color="primary" />}
        action={
          <SkeletonWrapper loading={isLoading}>
            <ClaimButton sources={claimableSources} disabled={isLoading || !hasAvailableClaims} />
          </SkeletonWrapper>
        }
      >
        <Grid container spacing={2} flex={1}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Stack
              divider={<Divider flexItem />}
              spacing={1}
              direction={narrowXs ? 'column' : 'row'}
              alignItems={narrowXs ? 'stretch' : 'flex-end'}
              height={1}
              justifyContent="stretch"
            >
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <TokenBalance balance={balances[0]} loading={isLoading} />
                <TokenBalance balance={balances[1]} loading={isLoading} />
                <TokenBalance balance={balances[2]} loading={isLoading} />
              </Stack>
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <TokenBalance balance={balances[3]} loading={isLoading} />
                <TokenBalance balance={balances[4]} loading={isLoading} />
                {demoFeaturesEnabled() && (
                  <TokenBalance balance={balances[5]} loading={isLoading} />
                )}
              </Stack>
            </Stack>
          </Grid>
          {narrowSm ? null : (
            <Grid size={{ xs: 0, sm: 4 }}>
              <Box display="flex" alignItems="flex-end" height={1}>
                <TotalBalance
                  balances={balances}
                  total={fromSqd(totalBalance)}
                  loading={isLoading}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </SummarySection>
    </Box>
  );
}
