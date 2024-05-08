import React, { useMemo } from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Chip, Stack } from '@mui/material';
import { Cell, Pie, PieChart } from 'recharts';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useMyAssets } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { Loader } from '@components/Loader';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { ClaimButton } from '@pages/DashboardPage/ClaimButton';

export function MyAssets() {
  const { isLoading, assets } = useMyAssets();

  const data = useMemo(
    () => [
      {
        name: 'Transferable',
        value: fromSqd(assets.balance).toNumber(),
        background: '#E3F7E0',
        color: '#55AD44',
      },
      {
        name: 'Locked',
        value: fromSqd(assets.locked).toNumber(),
        background: '#E3F7E0',
        color: '#55AD44',
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
      },
      {
        name: 'Bonded',
        value: fromSqd(assets.bonded).toNumber(),
        background: '#EBEBEB',
        color: '#2B2B2B',
      },
      {
        name: 'Delegated',
        value: fromSqd(assets.delegated).toNumber(),
        background: '#E8CDEB',
        color: '#B721FD',
      },
    ],
    [assets],
  );

  if (isLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle title="Assets" endAdornment={<ClaimButton />} />

      <ConnectedWalletRequired>
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
                      <Box sx={{ fontWeight: 500 }}>{formatSqd(d.value, 2)}</Box>
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
                        <Box sx={{ fontWeight: 500 }}>{formatSqd(s.value, 2)}</Box>
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
                    {formatSqd(assets.total, 2)}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Card>
      </ConnectedWalletRequired>
    </Box>
  );
}
