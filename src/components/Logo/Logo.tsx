import React from 'react';

import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import { upperFirst } from 'lodash-es';

import { useSubsquidNetwork } from '@network/useSubsquidNetwork';

export const LogoWrapper = styled('div', {
  name: 'LogoWrapper',
})(() => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    display: 'block',
    marginRight: 2,
  },
  userSelect: 'none',
}));

export const LogoPrimary = styled(Box, {
  name: 'LogoPrimary',
})(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: '0 em',
  marginLeft: theme.spacing(0.5),
}));

export const LogoSecondary = styled(Box, {
  name: 'LogoSecondary',
})(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1,
  letterSpacing: '0 em',
  marginLeft: theme.spacing(0.5),
  // fontStyle: 'italic',
}));

export function Logo({ color = '#fff' }: { color?: string }) {
  const theme = useTheme();
  const narrow = useMediaQuery(theme.breakpoints.down('lg'));
  const size = 32;

  const { network } = useSubsquidNetwork();

  return (
    <LogoWrapper>
      <img width={size} height={size} src="/logo.png" />
      {!narrow ? (
        <>
          <LogoPrimary sx={{ color }}>SUBSQUID</LogoPrimary>
          <LogoSecondary sx={{ color }}>{upperFirst(network)}</LogoSecondary>
        </>
      ) : null}
    </LogoWrapper>
  );
}
