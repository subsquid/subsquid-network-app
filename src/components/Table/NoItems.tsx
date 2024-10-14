import React from 'react';

import { ErrorOutlineOutlined } from '@mui/icons-material';
import { Box, Stack, SxProps, Typography } from '@mui/material';

export function NoItems({
  sx,
  children,
}: React.PropsWithChildren<{
  sx?: SxProps;
}>) {
  return (
    <Box
      className="no-items"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={sx}
      flexDirection="column"
    >
      <Typography variant="body1">
        <Stack spacing={1} direction="row" alignItems="center">
          <ErrorOutlineOutlined />
          {children || <span>No items to show</span>}
        </Stack>
      </Typography>
    </Box>
  );
}
