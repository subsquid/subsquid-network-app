import React from 'react';

import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGatewayByPeerId } from '@api/subsquid-network-squid/gateways-graphql';
import { BackButton } from '@components/BackButton';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';

import { GatewayCard } from './GatewayCard';
import { GatewayUnregister } from './GatewayUnregister';

export const Gateway = ({ backPath }: { backPath: string }) => {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: gateway, isLoading } = useGatewayByPeerId(peerId);

  const [searchParams] = useSearchParams();

  if (isLoading) return <Loader />;
  else if (!gateway) {
    return (
      <Box>
        Gateway <b>{peerId}</b> not found
      </Box>
    );
  }

  return (
    <CenteredPageWrapper className="wide">
      <Box sx={{ mb: 3 }}>
        <BackButton path={searchParams.get('backPath') || backPath} />
      </Box>
      <Card>
        <GatewayCard gateway={gateway} />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'right' }}>
          <GatewayUnregister gateway={gateway} />
        </Box>
      </Card>
    </CenteredPageWrapper>
  );
};
