import React, { PropsWithChildren } from 'react';

import { HelpOutline } from '@mui/icons-material';
import { Box, Stack, styled, Tooltip } from '@mui/material';

// export const Help = styled(Box)(({ theme, color }) => ({
//   width: 15,
//   height: 15,
//   color: color === 'default' ? theme.palette.text.default : '#fff',
//   backgroundColor: color === 'default' ? theme.palette.text.disabled : '#000',
//   borderRadius: 8,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '0.725rem',
//   lineHeight: '15px',
//   fontWeight: 500,
//   cursor: 'help',
// }));

export const HelpTooltip = ({
  help,
  children,
}: PropsWithChildren<{
  help: React.ReactNode;
  color?: 'default' | 'black';
}>) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box>{children}</Box>
      <Tooltip title={help} placement="top" arrow>
        <HelpOutline sx={{ width: 16, height: 16 }} />
      </Tooltip>
    </Stack>
  );
};
