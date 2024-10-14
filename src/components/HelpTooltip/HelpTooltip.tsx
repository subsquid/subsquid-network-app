import React, { PropsWithChildren } from 'react';

import { InfoOutlined } from '@mui/icons-material';
import { Stack, Tooltip } from '@mui/material';

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
  title,
  children,
  placement = 'end',
}: PropsWithChildren<{
  title: React.ReactNode;
  placement?: 'start' | 'end';
}>) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {placement === 'end' && children}
      <Tooltip title={title} placement="top">
        <InfoOutlined fontSize="small" />
      </Tooltip>
      {placement === 'start' && children}
    </Stack>
  );
};
