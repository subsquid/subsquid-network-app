import React, { useMemo } from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Chip, Stack } from '@mui/material';
import { Cell, Pie, PieChart } from 'recharts';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useMyAssets } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';

import { ClaimButton } from './ClaimButton';

export function MyAssets() {
  const { isLoading, assets } = useMyAssets();
  const { SQD_TOKEN } = useContracts();

  const data = useMemo(
    () => [
      {
        name: 'Transferable',
        value: fromSqd(assets.balance).toNumber(),
        background: '#E3F7E0',
        color: '#55AD44',
        tip: 'Liquid tokens, can be freely transferred to external addresses',
      },
      {
        name: 'Locked',
        value: fromSqd(assets.locked).toNumber(),
        background: '#FFE6C0',
        color: '#FF6B35',
        tip: 'Tokens locked in the vesting contracts owned by the wallet. Can be used for bonding (running a worker) and/or delegation',
        sub: assets.vestings.map(v => {
          return {
            name: (
              <CopyToClipboard
                text={v.address}
                content={addressFormatter(v.address, true)}
              ></CopyToClipboard>
            ),
            value: fromSqd(v.balance).toNumber(),
          };
        }),
      },
      {
        name: 'Claimable',
        value: fromSqd(assets.claimable).toNumber(),
        background: '#D1E3FF',
        color: '#3880EC',
        tip: 'Earned but not yet claimed token rewards, aggregated across all workers and delegations',
      },
      {
        name: 'Bonded',
        value: fromSqd(assets.bonded).toNumber(),
        background: '#EBEBEB',
        color: '#2B2B2B',
        tip: 'Tokens bonded in the worker registry contract. 100000 SQD has to be bonded per a worker node',
      },
      {
        name: 'Delegated',
        value: fromSqd(assets.delegated).toNumber(),
        background: '#F4DAFF',
        color: '#9C00FF',
        tip: 'Tokens delegated to workers',
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
          <Stack direction="row" justifyContent="space-between">
            <Box>
              {data.map((d, i) => {
                return (
                  <>
                    <Stack
                      key={d.name}
                      alignItems="center"
                      sx={{ mb: i === data.length - 1 ? 0 : 2 }}
                      direction="row"
                      spacing={1}
                    >
                      <Chip sx={{ background: d.background, color: d.color }} label={d.name} />
                      <HelpTooltip help={d.tip}>
                        <Box sx={{ fontWeight: 500 }}>{formatSqd(SQD_TOKEN, d.value, 2)}</Box>
                      </HelpTooltip>
                    </Stack>
                    {d.sub?.map(s => (
                      <Stack
                        key={d.name + s.name}
                        alignItems="center"
                        sx={{ mb: i === data.length - 1 ? 0 : 2 }}
                        direction="row"
                        spacing={1}
                      >
                        <Box width={16}></Box>
                        <Chip sx={{ background: d.background, color: d.color }} label={s.name} />
                        <Box sx={{ fontWeight: 500 }}>{formatSqd(SQD_TOKEN, s.value, 2)}</Box>
                      </Stack>
                    ))}
                  </>
                );
              })}
            </Box>
            <Box sx={{ position: 'relative', alignContent: 'center' }}>
              <PieChart width={210} height={210}>
                <Pie
                  data={data}
                  animationBegin={0}
                  animationDuration={0}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={105}
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
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                  <Box sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>Total</Box>
                  <Box sx={{ fontWeight: 500, fontSize: '1.25rem' }}>
                    {formatSqd(SQD_TOKEN, assets.total, 2)}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Card>
      )}
    </Box>
  );
}
