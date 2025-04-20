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
    <tr>
      <td colSpan={100} style={{ borderBottom: 'none', height: '96px' }}>
        <Box
          className="no-items"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          minHeight="96px"
          sx={sx}
          flexDirection="column"
        >
          <Stack spacing={1} direction="row" alignItems="center">
            <ErrorOutlineOutlined />
            <Typography variant="body1">{children || <span>No items to show</span>}</Typography>
          </Stack>
        </Box>
      </td>
    </tr>
  );
}
