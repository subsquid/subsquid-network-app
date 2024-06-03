import React from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
  whiteSpace: 'nowrap',
}));

export function SourceWalletName({ source, to }: { source: SourceWallet; to?: string }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar name={source.id.slice(2)} colorDiscriminator={source.id} />
      <Box>
        <Name>{source.type === AccountType.Vesting ? 'Vesting contract' : 'Wallet'}</Name>
        <Box sx={{ opacity: 0.8 }}>
          <CopyToClipboard
            text={source.id}
            content={<Link to={to || '#'}>{addressFormatter(source.id, true)}</Link>}
          />
        </Box>
      </Box>
    </Stack>
  );
}
