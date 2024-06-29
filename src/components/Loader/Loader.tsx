import React, { PropsWithChildren } from 'react';

import { Box, CircularProgress, useTheme } from '@mui/material';

export const Loader = ({
  minHeight = 300,
  loading = true,
  children,
}: PropsWithChildren<{ loading?: boolean; minHeight?: number }>) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // '& .subsquid-loader:after': {
          //   backgroundColor: theme.palette.primary.main,
          // },
        }}
      >
        {/* <div className="show visible">
          <div className="subsquid-loader"></div>
        </div> */}
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
};
