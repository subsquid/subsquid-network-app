import React, { PropsWithChildren } from 'react';

import { Box, Paper, styled } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import classNames from 'classnames';

export const CardTitle = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  lineHeight: 1,
  marginBottom: theme.spacing(3),
}));

export const CardWrapper = styled(Paper, { name: 'CardWrapper' })(({ theme }) => ({
  padding: theme.spacing(2.5, 5),
  boxShadow: `9px 9px 18px #e2e4e7, -9px -9px 18px #fbfbfb`,
  overflowX: 'auto',
  scrollbarWidth: 'thin',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
  },

  '&.disabled': {
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },

  '&.noPadding': {
    padding: 0,
  },

  '&.noShadow': {
    boxShadow: 'none',
  },
}));

export const Card = ({
  children,
  title,
  noShadow,
  noPadding,
  sx,
}: PropsWithChildren<{
  noShadow?: boolean;
  title?: React.ReactNode;
  sx?: SxProps;
  noPadding?: boolean;
}>) => {
  return (
    <Box>
      {title ? <CardTitle>{title}</CardTitle> : null}
      <CardWrapper
        className={classNames({
          noShadow,
          noPadding,
        })}
        sx={sx}
      >
        {children}
      </CardWrapper>
    </Box>
  );
};
