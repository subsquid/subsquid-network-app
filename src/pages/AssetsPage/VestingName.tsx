

import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.25),
  whiteSpace: 'nowrap',
}));

export function SourceWalletName({ source, to }: { source: SourceWallet; to?: string }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar name={source.id.slice(2)} colorDiscriminator={source.id} />
      <Box>
        <Name>{source.type === AccountType.Vesting ? 'Vesting contract' : 'Wallet'}</Name>
        <Typography variant="caption">
          <CopyToClipboard
            text={source.id}
            content={<Link to={to || '#'}>{addressFormatter(source.id, true)}</Link>}
          />
        </Typography>
      </Box>
    </Stack>
  );
}
