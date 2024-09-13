import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useUnregisterGateway } from '@api/contracts/gateway-registration/useUnregisterGateway';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { useAccount } from '@network/useAccount';

export function GatewayUnregister({
  gateway,
}: {
  gateway: any; // PickDeep<Gateway, 'id' | 'owner.id' | 'owner.type' | 'realOwner.id' | 'realOwner.type'>;
}) {
  const navigate = useNavigate();
  const {
    unregisterGateway,
    error: unregisterError,
    isLoading: isDeregistering,
  } = useUnregisterGateway();
  const { address } = useAccount();

  if (gateway.realOwner.id !== address) return null;

  return (
    <Box>
      <LoadingButton
        loading={isDeregistering}
        onClick={async e => {
          e.stopPropagation();

          const { failedReason } = await unregisterGateway({ gateway });

          if (!failedReason) {
            navigate('/portals');
          }
        }}
        variant="outlined"
        color="error"
      >
        UNREGISTER
      </LoadingButton>

      <BlockchainContractError error={unregisterError} />
    </Box>
  );
}
