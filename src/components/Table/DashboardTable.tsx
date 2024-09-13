import React, { PropsWithChildren } from 'react';

import { Box, styled, SxProps, Table } from '@mui/material';

import { Loader } from '@components/Loader';

export const DashboardTableBase = styled(Table)(({ theme }) => ({
  '& td, & th': {
    ...theme.typography.body1,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2, 1, 0),
    // fontVariantNumeric: 'tabular-nums',
    minHeight: theme.spacing(8),
  },

  '& td:last-child, & th:last-child': {
    paddingRight: theme.spacing(0),
  },

  '& th': {
    ...theme.typography.body2,
    minHeight: theme.spacing(4),
    textAlign: 'start',
    paddingTop: 0,
  },

  '& tbody': {
    position: 'relative',
  },

  '& tbody:not(:has(td))': {
    height: 200,
  },

  '& tbody .no-items': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  '& tbody:after': {
    position: 'sticky',
  },
}));

export function DashboardTable({
  children,
  title,
  sx,
  loading,
}: PropsWithChildren<{ title?: React.ReactNode; sx?: SxProps; loading?: boolean }>) {
  return (
    <Box sx={{ ...sx }}>
      {title ? (
        <Box display="flex" justifyContent="space-between" marginBottom={1} minHeight={36}>
          {title}
        </Box>
      ) : null}
      <Box sx={{ overflowX: 'auto', scrollbarWidth: 'thin', overflowY: 'clip' }}>
        <DashboardTableBase>{loading ? <Loader /> : children}</DashboardTableBase>
      </Box>
    </Box>
  );
}
