import React from 'react';

import { Box, styled, useMediaQuery, useTheme } from '@mui/material';

import { getSubsquidNetwork } from '@network/useSubsquidNetwork';

import { LogoCompact } from './LogoCompact';
import { LogoFull } from './LogoFull';

export const LogoWrapper = styled('div', {
  name: 'LogoWrapper',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    // display: 'block',
    // marginRight: 2,
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
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: '0 em',
  marginLeft: theme.spacing(0.5),
  // fontStyle: 'italic',
}));

export function Logo({ color = '#fff' }: { color?: string }) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <LogoWrapper>
      {compact ? <LogoCompact /> : <LogoFull />}
      {/* <img width={size} height={size} src="/logo.png" /> */}
      {/* {!narrow ? (
        <>
          <LogoPrimary sx={{ color }}>SUBSQUID</LogoPrimary>
          <LogoSecondary sx={{ color }}>{upperFirst(network)}</LogoSecondary>
        </>
      ) : null} */}
    </LogoWrapper>
  );
}
