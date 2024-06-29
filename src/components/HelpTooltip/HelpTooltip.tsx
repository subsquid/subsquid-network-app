import React, { PropsWithChildren } from 'react';

import { Box, Tooltip } from '@mui/material';

import { InfoIcon } from '@icons/InfoIcon';

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
}: PropsWithChildren<{
  title: React.ReactNode;
}>) => {
  return (
    <Tooltip title={title} placement="top">
      <Box display="flex">
        <InfoIcon />
      </Box>
    </Tooltip>
  );
};
