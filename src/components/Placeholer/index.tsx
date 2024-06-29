import { PropsWithChildren } from 'react';

import { Box, SxProps } from '@mui/material';

function Placeholder({ children, sx }: PropsWithChildren<{ sx?: SxProps }>) {
  return (
    <Box className="placeholder" sx={sx}>
      {children}
    </Box>
  );
}

export default Placeholder;
