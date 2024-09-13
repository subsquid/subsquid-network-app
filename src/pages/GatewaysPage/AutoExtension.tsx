import { Box, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';

import { useAutoExtension } from '@api/contracts/gateway-registration/useAutoExtension';
import { GatewayStakeFragmentFragment } from '@api/subsquid-network-squid';

export function AutoExtension({
  stake,
  disabled,
}: {
  stake?: GatewayStakeFragmentFragment;
  disabled?: boolean;
}) {
  const { setAutoExtension } = useAutoExtension();

  return (
    <Box pl={0.5} pr={0.5}>
      <FormGroup>
        <FormControlLabel
          disabled={disabled || !stake}
          checked={stake?.autoExtension}
          control={<Switch onChange={async () => await setAutoExtension(!stake?.autoExtension)} />}
          label={<Typography variant="body2">Auto Extension</Typography>}
          labelPlacement="start"
        />
      </FormGroup>
    </Box>
  );
}
