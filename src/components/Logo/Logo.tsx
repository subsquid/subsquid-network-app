import React from 'react';

import { Box, styled, useMediaQuery, useTheme } from '@mui/material';

export const LogoWrapper = styled('div', {
  name: 'LogoWrapper',
})(() => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    display: 'block',
    marginRight: 2,
  },
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

export function Logo({ color = '#fff' }: { color?: string }) {
  const theme = useTheme();
  const narrow = useMediaQuery(theme.breakpoints.down('lg'));
  const size = 32;

  return (
    <LogoWrapper>
      <img width={size} height={size} src="/logo.png" />
      {!narrow ? <LogoPrimary sx={{ color }}>SUBSQUID</LogoPrimary> : null}
    </LogoWrapper>
  );
}
