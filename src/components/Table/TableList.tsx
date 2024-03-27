import { styled, Table } from '@mui/material';

export const TableList = styled(Table, {
  name: 'TableList',
})(() => ({
  '& tbody tr:last-child td': {
    border: 'none',
  },
  '& tr td:first-child, & tr th:first-child': {
    paddingLeft: 0,
  },
  '& tr td:last-child, & tr th:last-child': {
    paddingRight: 0,
  },
}));
