import React from 'react';

import { Box } from '@mui/material';
import { upperFirst } from 'lodash-es';

export function NotFound({ id, item }: { id?: string; item?: string }) {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 300px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box>
          {item || id ? (
            <>
              {item ? upperFirst(item) : null} {id ? <b>{id}</b> : null} not found
            </>
          ) : (
            <>Not found</>
          )}
        </Box>
      </Box>
    </Box>
  );
}
