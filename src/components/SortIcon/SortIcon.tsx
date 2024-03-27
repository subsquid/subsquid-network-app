import React from 'react';

import ArrowUpward from '@mui/icons-material/ArrowUpward';

import { SortableIcon } from '@icons/SortableIcon';

export function SortIcon({
  query,
  value,
}: {
  query: {
    sortDir?: string;
    sortBy?: string;
  };
  value: string;
}) {
  if (query.sortBy !== value) {
    return <SortableIcon />;
  }

  return (
    <ArrowUpward
      color="primary"
      sx={{
        width: 16,
        height: 16,
        transition: 'transform 300ms ease-out',
        transform: query.sortDir === 'asc' ? 'rotate(180deg)' : 'rotate(0)',
      }}
    />
  );
}
