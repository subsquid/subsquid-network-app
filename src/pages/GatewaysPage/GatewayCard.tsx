import React from 'react';

import { IconButton, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { shortPeerId } from '@components/PeerId';
import { EditIcon } from '@icons/EditIcon';

import { GatewayStatus } from './GatewayStatus';

export const PeerIdRow = styled(Box, {
  name: 'PeerIdRow',
})(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  color: theme.palette.importantLink.main,
  fontSize: '0.875rem',
}));

export const GatewayDescription = styled(Box, {
  name: 'GatewayDescription',
})(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
}));

function GatewayTitle({ gateway }: { gateway: BlockchainGateway }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ fontSize: '1.5rem', lineHeight: 1.4, overflowWrap: 'anywhere' }}>
        {gateway.name || gateway.id}
      </Box>
      {gateway.ownedByMe ? (
        <IconButton component={Link} to={`/gateways/${gateway.id}/edit`}>
          <EditIcon size={18} color="#1D1D1F" />
        </IconButton>
      ) : null}
    </Box>
  );
}

export const GatewayCard = ({ gateway }: { gateway: BlockchainGateway }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Stack spacing={3} direction="row">
      <Avatar
        variant="circular"
        name={gateway.name || gateway.id}
        colorDescriminator={gateway.id}
        size={100}
      />
      <Box sx={{ flex: 1 }}>
        <GatewayTitle gateway={gateway} />
        <PeerIdRow>
          <CopyToClipboard
            text={gateway.id}
            content={isMobile ? shortPeerId(gateway.id) : gateway.id}
          />
        </PeerIdRow>
        <GatewayStatus gateway={gateway} />
      </Box>
    </Stack>
  );
};
