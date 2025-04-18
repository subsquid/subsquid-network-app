import React from 'react';

import { Box, styled, SxProps, Table, TableBody } from '@mui/material';

import { Loader } from '@components/Loader';

interface DashboardTableProps {
  /** Optional title to display above the table */
  title?: React.ReactNode;
  /** Optional custom styles */
  sx?: SxProps;
  /** Loading state of the table */
  loading?: boolean;
  /** Table content including TableHead and TableBody */
  children: React.ReactNode;
  /** Optional class name for the root element */
  className?: string;
}

const TABLE_STYLES = {
  cell: {
    typography: 'body1',
    borderBottom: '1px solid',
    padding: '8px 16px 8px 0',
    minHeight: '32px',
  },
  header: {
    typography: 'body2',
    minHeight: '16px',
    textAlign: 'start',
    paddingTop: 0,
  },
  body: {
    position: 'relative',
    minHeight: '150px',
  },
} as const;

export const DashboardTableBase = styled(Table)(({ theme }) => ({
  '& td, & th': {
    ...theme.typography.body1,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2, 1, 0),
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
    minHeight: 150,
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

  width: '100%',
  minWidth: 'max-content',
}));

const LoadingTableBody = () => (
  <TableBody>
    <tr>
      <td colSpan={100} style={{ borderBottom: 'none' }}>
        <Box display="flex" alignItems="center" justifyContent="center" minHeight={200}>
          <Loader loading />
        </Box>
      </td>
    </tr>
  </TableBody>
);

const TitleSection = ({ title }: { title: React.ReactNode }) =>
  title ? (
    <Box display="flex" justifyContent="space-between" marginBottom={1} minHeight={36}>
      {title}
    </Box>
  ) : null;

export const DashboardTable = ({
  children,
  title,
  sx,
  loading,
  className,
}: DashboardTableProps) => {
  const tableContent = loading ? <LoadingTableBody /> : children;

  return (
    <Box sx={sx} className={className}>
      <TitleSection title={title} />
      <Box
        position="relative"
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          maxHeight: '100%',
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        <DashboardTableBase>{tableContent}</DashboardTableBase>
      </Box>
    </Box>
  );
};
