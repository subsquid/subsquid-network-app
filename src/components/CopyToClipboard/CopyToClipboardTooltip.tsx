import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Stack, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

export const CopyToClipboardTooltip = ({
  children,
  copied,
  setCopied,
}: {
  children: JSX.Element;
  copied: boolean;
  setCopied: (copied: boolean) => void;
}) => {
  return (
    <Tooltip
      title={
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {copied ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box>Copied</Box>
              <CheckIcon sx={{ width: 16, height: 16 }} />
            </Stack>
          ) : (
            <Box>Copy</Box>
          )}
        </Box>
      }
      arrow
      // open
      placement="top"
      onClose={() => {
        setTimeout(() => setCopied(false), 400);
      }}
    >
      {children}
    </Tooltip>
  );
};
