import React from 'react';

import { Box, Card, CircularProgress, Stack, Typography, useTheme } from '@mui/material';

import { useSquidNetworkHeight } from '@hooks/useSquidNetworkHeightHooks';

export const SyncSquidSnackbar = () => {
  const theme = useTheme();

  const { isWaiting, waitHeight, currentHeight } = useSquidNetworkHeight();

  if (!isWaiting) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 100000,
        right: 10,
        bottom: 10,
      }}
    >
      <Card
        sx={{
          // boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.20)`,
          borderRadius: '4px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: theme.palette.divider,
          background: theme.palette.background.default,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <CircularProgress size={20} color="secondary" />
          <Typography variant="body1">
            Synced {currentHeight} block of {waitHeight}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};
