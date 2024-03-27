import React, { PropsWithChildren } from 'react';

import { Box, SxProps } from '@mui/material';

export function Form({
  children,
  maxWidth,
  onSubmit,
  sx,
}: PropsWithChildren<{
  maxWidth?: number;
  onSubmit?: () => unknown;
  sx?: SxProps;
}>) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ mb: 4, mt: 4, maxWidth, ...sx }}
    >
      {children}
    </Box>
  );
}
