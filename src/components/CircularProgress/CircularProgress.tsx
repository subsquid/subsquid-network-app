import React from 'react';

import { Stack, CircularProgress as MaterialCircularProgress, styled, Box } from '@mui/material';

const Percent = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
  lineHeight: 1,
  '&.secondary': {
    color: theme.palette.secondary.contrastText,
  },
  '&.success': {
    color: theme.palette.success.contrastText,
  },
  '&.info': {
    color: theme.palette.info.contrastText,
  },
  '&.error': {
    color: theme.palette.error.dark,
  },
  '&.warning': {
    color: theme.palette.warning.contrastText,
  },
}));

const Progress = styled(MaterialCircularProgress)(({ theme }) => ({
  '&.background': {
    color: theme.palette.background.default,
  },
  '&.secondary': {
    color: theme.palette.secondary.contrastText,
  },
  '&.success': {
    color: theme.palette.success.contrastText,
  },
  '&.info': {
    color: theme.palette.info.contrastText,
  },
  '&.warning': {
    color: theme.palette.warning.contrastText,
  },
  '&.error': {
    color: theme.palette.error.contrastText,
  },
}));

export function CircularProgress({
  percent,
  color,
  hideProgressBar,
}: {
  percent: number;
  hideProgressBar?: boolean;
  color: 'primary' | 'info' | 'success' | 'error' | 'inherit' | 'warning';
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {!hideProgressBar && (
        <Box sx={{ position: 'relative' }}>
          <Progress
            className="background"
            size={24}
            thickness={7.5}
            variant="determinate"
            value={100}
          />
          <Progress
            className={color}
            sx={{
              position: 'absolute',
              left: 0,
            }}
            size={24}
            thickness={7.5}
            variant="determinate"
            value={percent}
          />
        </Box>
      )}
      <Percent className={color}>{percent}%</Percent>
    </Stack>
  );
}
