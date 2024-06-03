import React, { PropsWithChildren, SyntheticEvent } from 'react';

import { Stack, styled, Table, TableCell } from '@mui/material';
import { Box } from '@mui/system';

import { SortDir } from '@api/subsquid-network-squid';
import { SortIcon } from '@components/SortIcon';

const borderRadius = 8;

export const BorderedTable = styled(Table)(({ theme }) => ({
  // boxShadow: `0px 4px 12px 0px #9595953D`,
  borderRadius: borderRadius,
  borderSpacing: 0,
  borderCollapse: 'separate',
  // border: `1px solid ${theme.palette.divider}`,

  '& td, & th': {
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.background.content}`,
    padding: theme.spacing(2.5, 2),
  },

  '& td:first-of-type, & th:first-of-type': {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2.5),
    },
  },

  '& td:last-of-type, & th:last-of-type': {
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(2.5),
    },
  },

  '& th': {
    color: theme.palette.text.secondary,
    fontWeight: 'normal',
    lineHeight: 1,
    fontSize: '0.875rem',
  },

  '& tr.hoverable:hover td, & tr.hovered td': {
    background: theme.palette.action.hover,
  },

  '& thead th:first-of-type': { borderTopLeftRadius: borderRadius },
  '& thead th:last-of-type': { borderTopRightRadius: borderRadius },

  '& tbody tr:last-of-type td': {
    borderBottom: 'none',
  },
  '& tbody tr:last-of-type td:first-of-type': {
    borderBottomLeftRadius: borderRadius,
  },
  '& tbody tr:last-of-type td:last-of-type': {
    borderBottomRightRadius: borderRadius,
  },
}));

const ClickableStack = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  width: 'auto',
  userSelect: 'none',
}));

export function SortableHeaderCell<S extends string>({
  sort,
  children,
  query,
  width,
  setQuery,
}: PropsWithChildren<{
  sort: S;
  width?: string | number;
  query: { sortBy: string; sortDir: string };
  setQuery: { sortBy: (v: string) => unknown; sortDir: (v: string) => unknown };
}>) {
  const handleSortChange = (sortBy: S) => (e: SyntheticEvent) => {
    e.preventDefault();

    if (query.sortBy === sortBy) {
      setQuery.sortDir(query.sortDir === SortDir.Asc ? SortDir.Desc : SortDir.Asc);
    } else {
      setQuery.sortBy(sortBy);
      setQuery.sortDir(SortDir.Desc);
    }
  };

  return (
    <TableCell>
      <ClickableStack
        onClick={handleSortChange(sort)}
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Box sx={{ width }}>{children}</Box>
        <Box>
          <SortIcon query={query} value={sort} />
        </Box>
      </ClickableStack>
    </TableCell>
  );
}
