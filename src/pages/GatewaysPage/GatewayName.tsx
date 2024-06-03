import React from 'react';

import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { Avatar } from '@components/Avatar';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { PeerIdShort, shortPeerId } from '@components/PeerId';

const Name = styled(Box, {
  name: 'Name',
})(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontWeight: 500,
}));

export const GatewayName = ({ gateway, to }: { gateway: BlockchainGateway; to?: string }) => {
  return (
    <Stack spacing={2} direction="row">
      <Avatar colorDiscriminator={gateway.id} name={gateway.name || gateway.id} />
      <Box>
        {gateway.name ? <Name>{gateway.name}</Name> : null}
        <Stack direction="row" spacing={1}>
          <Box>
            <CopyToClipboard
              text={gateway.id}
              content={
                <PeerIdShort>
                  <Link to={to || ''}>{shortPeerId(gateway.id)}</Link>
                </PeerIdShort>
              }
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
