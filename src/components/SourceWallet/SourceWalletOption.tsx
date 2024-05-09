import React from 'react';

import { Box, Stack, styled } from '@mui/material';

import { formatSqd } from '@api/contracts/utils';
import { AccountType, SourceWallet } from '@api/subsquid-network-squid';
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

export const SourceWalletOption = ({ source }: { source: SourceWallet }) => {
  const { SQD_TOKEN } = useContracts();

  return (
    <SourceWalletOptionWrapper>
      <SourceWalletLabel>
        {source.type === AccountType.User ? 'Wallet' : 'Vesting contract'}
      </SourceWalletLabel>
      <SourceWalletStack direction="row" spacing={1} justifyContent="space-between">
        <Box>{source.id}</Box>
        <SourceWalletBalance>{formatSqd(SQD_TOKEN, source?.balance)}</SourceWalletBalance>
      </SourceWalletStack>
    </SourceWalletOptionWrapper>
  );
};
