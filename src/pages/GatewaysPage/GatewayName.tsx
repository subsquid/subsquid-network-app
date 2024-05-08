import React from 'react';

import { Stack, styled } from '@mui/material';
import { Box } from '@mui/system';

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

export const GatewayName = ({ gateway }: { gateway: BlockchainGateway }) => {
  return (
    <Stack spacing={2} direction="row">
      <Avatar colorDescriminator={gateway.id} name={gateway.name || gateway.id} />
      <Box>
        {gateway.name ? <Name>{gateway.name}</Name> : null}
        <Stack direction="row" spacing={1}>
          <Box>
            <CopyToClipboard
              text={gateway.id}
              content={<PeerIdShort>{shortPeerId(gateway.id)}</PeerIdShort>}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
