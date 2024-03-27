import { styled, Table } from '@mui/material';

export const PopoverContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 2),
  fontSize: '0.85rem',
  lineHeight: 1,
  color: theme.palette.text.default,
  // width: 230,
}));

export const PopoverTable = styled(Table)(({ theme }) => ({
  '& td, & th': {
    border: 'none',
    padding: theme.spacing(0.5, 0.5),
    fontSize: '0.85rem',
  },
  '& th': {
    fontWeight: 700,
  },
  '& td:first-child, & th:first-child': {
    paddingRight: theme.spacing(1),
  },
}));
