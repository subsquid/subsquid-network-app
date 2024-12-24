import { addressFormatter } from '@lib/formatters/formatters';
import { Box, Stack, styled, Typography } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.25),
  whiteSpace: 'nowrap',
}));

export function SourceWalletName({ source }: { source: { id: string } }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar name={source.id.slice(2)} colorDiscriminator={source.id} />
      <Box>
        <Name>Contract</Name>
        <Typography variant="caption">
          <CopyToClipboard text={source.id} content={addressFormatter(source.id, true)} />
        </Typography>
      </Box>
    </Stack>
  );
}
