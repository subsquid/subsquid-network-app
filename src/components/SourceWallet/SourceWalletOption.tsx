import { addressFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import { Box, Stack, styled, useMediaQuery, useTheme } from '@mui/material';

import { AccountType, SourceWalletWithBalance } from '@api/subsquid-network-squid';
import { useContracts } from '@network/useContracts';

const SourceWalletOptionWrapper = styled(Box, {
  name: 'SourceWalletOptionWrapper',
})(() => ({
  fontSize: '0.875rem',
  width: '100%',
}));

const SourceWalletLabel = styled(Box, {
  name: 'SourceWalletLabel',
})(({ theme }) => ({
  lineHeight: 1.2,
  fontSize: '0.8rem',
  marginTop: theme.spacing(0.5),
}));

const SourceWalletStack = styled(Stack, {
  name: 'SourceWalletStack',
})(() => ({
  width: '100%',
}));

const SourceWalletBalance = styled(Stack, {
  name: 'SourceWalletBalance',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'right',
}));

export const SourceWalletOption = ({ source }: { source: SourceWalletWithBalance }) => {
  const { SQD_TOKEN } = useContracts();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SourceWalletOptionWrapper>
      <SourceWalletLabel>
        {source.type === AccountType.User ? 'Wallet' : 'Vesting contract'}
      </SourceWalletLabel>
      <SourceWalletStack direction="row" spacing={1} justifyContent="space-between">
        <Box>{addressFormatter(source.id, isMobile)}</Box>
        <SourceWalletBalance>
          {tokenFormatter(fromSqd(source?.balance), SQD_TOKEN)}
        </SourceWalletBalance>
      </SourceWalletStack>
    </SourceWalletOptionWrapper>
  );
};
