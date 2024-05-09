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
  padding: theme.spacing(3),
  borderRadius: 8,
  boxShadow: `0px 4px 12px 0px #9595953D`,

  [theme.breakpoints.down('xxs')]: {
    padding: theme.spacing(2),
  },

  '&.guideActive': {
    position: 'relative',
    zIndex: theme.zIndex.guide.highlight,
  },

  '&.disabled': {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },

  '&.noShadow': {
    boxShadow: 'none',
  },
}));

export const Card = ({
  children,
  title,
  noShadow,
  sx,
}: PropsWithChildren<{ noShadow?: boolean; title?: React.ReactNode; sx?: SxProps }>) => {
  return (
    <Box>
      {title ? <CardTitle>{title}</CardTitle> : null}
      <CardWrapper
        className={classNames({
          noShadow,
        })}
        sx={sx}
      >
        {children}
      </CardWrapper>
    </Box>
  );
};
