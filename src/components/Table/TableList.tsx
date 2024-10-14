import { styled, Table } from '@mui/material';

export const TableList = styled(Table, {
  name: 'TableList',
})(({ theme }) => ({
  // '& tbody tr:last-child td': {
  //   border: 'none',
  // },
  '& td, & th': {
    borderBottomColor: theme.palette.divider,
  },
  '& tr td:first-child, & tr th:first-child': {
    paddingLeft: 0,
  },
  '& tr td:last-child, & tr th:last-child': {
    paddingRight: 0,
  },
}));
