import React, { PropsWithChildren, ReactNode } from 'react';

import { Box, styled, Typography } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';

import { BackButton } from '@components/BackButton';

const PageTitleWrapper = styled('div', {
  name: 'PageTitleWrapper',
})(({ theme }) => ({
  marginBottom: theme.spacing(5),

  '& .title': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3.5),

    [theme.breakpoints.down('xxs')]: {
      gap: theme.spacing(2),
    },
  },

  '& .endAdornment': {
    marginLeft: 'auto',
  },

  [theme.breakpoints.down('xxs')]: {
    marginBottom: theme.spacing(4),
  },
}));

const PageDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  // maxWidth: 600,
}));

export function NetworkPageTitle({
  backPath,
  children,
  endAdornment,
  sx,
  title,
}: PropsWithChildren<{
  backPath?: string;
  endAdornment?: ReactNode;
  sx?: SxProps;
  title?: string;
}>) {
  return (
    <PageTitleWrapper sx={sx}>
      <Typography
        variant="h1"
        sx={{
          lineHeight: 1,
          mb: 3,
        }}
      >
        <div className="title">
          {backPath ? <BackButton path={backPath} /> : null}
          <Box color="text.primary">{title}</Box>
          {endAdornment ? <div className="endAdornment">{endAdornment}</div> : null}
        </div>
      </Typography>
      {children ? <PageDescription>{children}</PageDescription> : null}
    </PageTitleWrapper>
  );
}
