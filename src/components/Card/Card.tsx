import React, { PropsWithChildren } from 'react';

import { Box, Paper, styled, Theme } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import classNames from 'classnames';

export interface CardProps {
  /** Optional title for the card */
  title?: React.ReactNode;
  /** Custom styles for the card */
  sx?: SxProps<Theme>;
  /** Whether to remove padding from the card */
  noPadding?: boolean;
  /** Whether to add an outline to the card */
  outlined?: boolean;
  /** Whether to remove the shadow from the card */
  noShadow?: boolean;
  /** Whether the card is in a loading state */
  loading?: boolean;
  /** Optional action elements to display in the card header */
  action?: React.ReactNode;
  /** Custom styles for the title */
  titleSx?: SxProps<Theme>;
  /** Custom styles for the content */
  contentSx?: SxProps<Theme>;
  /** Custom styles for the action area */
  actionSx?: SxProps<Theme>;
  /** Whether to disable the card */
  disabled?: boolean;
  /** Optional className for the card */
  className?: string;
}

export const CardTitle = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  lineHeight: 1,
  marginBottom: theme.spacing(3),
}));

export const CardWrapper = styled(Paper, { name: 'CardWrapper' })(({ theme }) => ({
  padding: theme.spacing(1.5, 1.5),
  boxShadow: 'none',
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  transition: 'all 300ms ease-out',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
  },

  '&.disabled': {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    opacity: 0.7,
    pointerEvents: 'none',
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
  action,
  titleSx,
  contentSx,
  actionSx,
  disabled,
  className,
}: PropsWithChildren<CardProps>) => {
  return (
    <>
      {(title || action) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            ...titleSx,
          }}
        >
          {title && <CardTitle sx={titleSx}>{title}</CardTitle>}
          {action && (
            <Box sx={{ display: 'flex', alignItems: 'center', ...actionSx }}>{action}</Box>
          )}
        </Box>
      )}
      <CardWrapper
        className={classNames(className, {
          noShadow,
          noPadding,
          outlined,
          disabled,
        })}
        sx={sx}
      >
        <Box sx={contentSx}>{children}</Box>
      </CardWrapper>
    </>
  );
};
