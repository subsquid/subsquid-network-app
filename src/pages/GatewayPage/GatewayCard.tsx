import React from 'react';

import { Divider, IconButton, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { GatewayStake } from '@pages/GatewayPage/GatewayStake';
import { GatewayUnstake } from '@pages/GatewayPage/GatewayUnstake';

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
      <Box sx={{ flex: 1, ml: 1, fontSize: '1.5rem', lineHeight: 1.4 }}>
        {gateway.name || gateway.id}
      </Box>
      <Stack direction="row" spacing={2}>
        {Number(gateway.totalStaked) > 0 || Number(gateway.pendingStaked) > 0 ? null : (
          <GatewayStake gateway={gateway} />
        )}
        {Number(gateway.totalStaked) > 0 || Number(gateway.pendingStaked) > 0 ? (
          <GatewayUnstake gateway={gateway} />
        ) : null}
        {/*{gateway.ownedByMe ? (*/}
        {/*  <Link to={`/profile/workers/${gateway.id}/edit`}>*/}
        {/*    <IconButton>*/}
        {/*      <EditIcon size={18} color="#1D1D1F" />*/}
        {/*    </IconButton>*/}
        {/*  </Link>*/}
        {/*) : null}*/}
      </Stack>
    </Box>
  );
}

export const GatewayCard = ({ gateway }: { gateway: BlockchainGateway }) => {
  return (
    <Box>
      <Stack spacing={3} direction="row">
        <Avatar
          variant="rounded"
          name={gateway.name || gateway.id}
          colorDescriminator={gateway.id}
          size={130}
        />
        <Box sx={{ flex: 1 }}>
          <GatewayTitle gateway={gateway} />
          <Divider sx={{ my: 1 }} />
          <GatewayDescription>{gateway.description}</GatewayDescription>
          <Box>
            <PeerIdRow>
              <CopyToClipboard text={gateway.id} content={gateway.id} />
            </PeerIdRow>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
