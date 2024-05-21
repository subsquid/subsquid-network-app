import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useUnregisterGateway } from '@api/contracts/gateway-registration/useUnregisterGateway';
import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
import { BlockchainContractError } from '@components/BlockchainContractError';

export function GatewayUnregister({ gateway }: { gateway: BlockchainGateway }) {
  const navigate = useNavigate();
  const {
    unregisterGateway,
    error: unregisterError,
    isLoading: isUnregistering,
  } = useUnregisterGateway();

  if (!gateway.ownedByMe) return null;

  return (
    <Box>
      <LoadingButton
        loading={isUnregistering}
        onClick={async e => {
          e.stopPropagation();

          const { failedReason } = await unregisterGateway({ gateway });

          if (!failedReason) {
            navigate('/gateways');
          }
        }}
        variant="contained"
        color="error"
      >
        Unregister
      </LoadingButton>

      <BlockchainContractError error={unregisterError} />
    </Box>
  );
}
