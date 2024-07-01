import React, { PropsWithChildren } from 'react';

import { Box, Paper, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import classNames from 'classnames';

export const CardTitle = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  lineHeight: 1,
  marginBottom: theme.spacing(3),
}));

export const CardWrapper = styled(Paper, { name: 'CardWrapper' })(({ theme }) => ({
  padding: theme.spacing(1.5, 1.5),
  // boxShadow: `0px 4px 12px 0px #9595953D`,
  boxShadow: 'none',
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

  '&.outlined': {
    background: theme.palette.background.default,
    borderColor: theme.palette.divider,
    borderWidth: 1,
    borderStyle: 'solid',
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
  outlined,
  sx,
}: PropsWithChildren<{
  noShadow?: boolean;
  title?: React.ReactNode;
  sx?: SxProps<Theme>;
  noPadding?: boolean;
  outlined?: boolean;
}>) => {
  return (
    <>
      {title ? <CardTitle>{title}</CardTitle> : null}
      <CardWrapper
        className={classNames({
          noShadow,
          noPadding,
          outlined,
        })}
        sx={sx}
      >
        {children}
      </CardWrapper>
    </>
  );
};
