import React from 'react';

import { Box, CircularProgress, Paper, Stack } from '@mui/material';

import { useSquidNetworkHeightHooks } from '@hooks/useSquidNetworkHeightHooks';

export const SyncSquidSnackbar = () => {
  const { isWaiting, waitHeight, currentHeight } = useSquidNetworkHeightHooks();

  if (!isWaiting) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 100000,
        right: 10,
        bottom: 10,
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CircularProgress size={20} />
          <Box>
            Synced {currentHeight} block of {waitHeight}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
