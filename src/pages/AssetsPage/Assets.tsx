import React, { useMemo } from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Chip, Stack, styled, SxProps, Theme, useMediaQuery, useTheme } from '@mui/material';
import Decimal from 'decimal.js';
import { Cell, Pie, PieChart } from 'recharts';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useMyAssets } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';
import { useSubsquidNetwork } from '@network/useSubsquidNetwork';

import { ClaimButton } from './ClaimButton';

const TokenBalanceList = styled(Box, {
  name: 'TokenBalanceList',
})(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
}));

function TokenBalanceItem({ sx, children }: { sx?: SxProps<Theme>; children?: React.ReactNode[] }) {
  return (
    <Stack alignItems="center" direction="row" spacing={1} sx={{ ...sx }}>
      {children}
    </Stack>
  );
}

function TokenBalanceLabel({ value, sx }: { value: React.ReactNode; sx?: SxProps<Theme> }) {
  return <Chip sx={{ ...sx }} label={value} />;
}

function TokenBalanceValue({ value, decimals }: { value: string | Decimal; decimals?: number }) {
  const { SQD_TOKEN } = useContracts();

  return <Box sx={{ fontWeight: 500 }}>{formatSqd(SQD_TOKEN, value, decimals ?? 4)}</Box>;
}

function TotalBalance({
  data,
  total,
}: {
  data: { name: string; balance: Decimal; background: string }[];
  total: string | Decimal;
}) {
  const { SQD_TOKEN } = useContracts();

  return (
    <Box sx={{ position: 'relative', alignSelf: 'center' }}>
      <PieChart width={210} height={210}>
        <Pie
          data={data.map(i => ({ name: i.name, value: i.balance.toNumber() }))}
          animationBegin={0}
          animationDuration={0}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={105}
          nameKey="name"
          dataKey="value"
        >
          {data.map(i => (
            <Cell
              onClick={e => {
                e.preventDefault();
              }}
              key={i.name}
              fill={i.background}
            />
          ))}
        </Pie>
      </PieChart>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Box sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>Total</Box>
          <Box sx={{ fontWeight: 500, fontSize: '1.25rem' }}>{formatSqd(SQD_TOKEN, total, 4)}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export function MyAssets() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { isLoading, assets } = useMyAssets();
  const { network } = useSubsquidNetwork();

  const data = useMemo(
    () => [
      {
        name: 'Transferable',
        balance: fromSqd(assets.balance),
        background: '#E3F7E0',
        color: '#55AD44',
        help: 'Liquid tokens, can be freely transferred to external addresses',
      },
      {
        name: 'Locked',
        balance: fromSqd(assets.locked),
        background: '#FFE6C0',
        color: '#FF6B35',
        help: 'Tokens locked in the vesting contracts owned by the wallet. Can be used for bonding (running a worker) and/or delegation',
        vestings: assets.vestings,
      },
      {
        name: 'Claimable',
        balance: fromSqd(assets.claimable),
        background: '#D1E3FF',
        color: '#3880EC',
        help: 'Earned but not yet claimed token rewards, aggregated across all workers and delegations',
      },
      {
        name: 'Bonded',
        balance: fromSqd(assets.bonded),
        background: '#EBEBEB',
        color: '#2B2B2B',
        help: 'Tokens bonded in the worker registry contract. 100000 SQD has to be bonded per a worker node',
      },
      {
        name: 'Delegated',
        balance: fromSqd(assets.delegated),
        background: '#F4DAFF',
        color: '#9C00FF',
        help: 'Tokens delegated to workers',
      },
    ],
    [assets],
  );

  return (
    <Box>
      <NetworkPageTitle title="My Assets" endAdornment={<ClaimButton />} />

      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <Stack
            direction={isMobile ? 'column-reverse' : 'row'}
            justifyContent="space-between"
            spacing={2.5}
          >
            <TokenBalanceList>
              {data.map(d => {
                return (
                  <React.Fragment key={d.name}>
                    <TokenBalanceItem key={d.name}>
                      <TokenBalanceLabel
                        sx={{ background: d.background, color: d.color }}
                        value={d.name}
                      />
                      <HelpTooltip help={d.help}>
                        <TokenBalanceValue value={d.balance} />
                      </HelpTooltip>
                    </TokenBalanceItem>

                    {d.vestings?.map(v => (
                      <TokenBalanceItem key={d.name + '-' + v.address} sx={{ ml: 2.5 }}>
                        <TokenBalanceLabel
                          sx={{ background: d.background, color: d.color }}
                          value={
                            <CopyToClipboard
                              text={v.address}
                              content={addressFormatter(v.address, true)}
                            ></CopyToClipboard>
                          }
                        />
                        <TokenBalanceValue value={v.balance} />
                      </TokenBalanceItem>
                    ))}
                  </React.Fragment>
                );
              })}
            </TokenBalanceList>
            <TotalBalance data={data} total={assets.total} />
          </Stack>
        </Card>
      )}
    </Box>
  );
}
