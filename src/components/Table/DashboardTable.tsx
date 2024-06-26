import { styled, Table } from '@mui/material';

export const DashboardTable = styled(Table)(({ theme }) => ({
  '& td, & th': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2, 1, 0),
    fontVariantNumeric: 'tabular-nums',
    minHeight: theme.spacing(8),
  },

  '& td:last-child, & th:last-child': {
    paddingRight: theme.spacing(0),
  },

  '& th': {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    lineHeight: '20px',
    minHeight: theme.spacing(4),
  },
}));
