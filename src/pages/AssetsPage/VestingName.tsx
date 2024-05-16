import React from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Stack, styled } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
  whiteSpace: 'nowrap',
}));

export function VestingName({ vesting }: { vesting: { address: string } }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar name={vesting.address.slice(2)} colorDescriminator={vesting.address} />
      <Box>
        <Name>Vesting contract</Name>
        <Box sx={{ opacity: 0.8 }}>
          <CopyToClipboard
            text={vesting.address}
            content={addressFormatter(vesting.address, true)}
          />
        </Box>
      </Box>
    </Stack>
  );
}
