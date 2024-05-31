import { Button, styled } from '@mui/material';

import { NetworkName } from '@network/useSubsquidNetwork.ts';

const inverseNetworkName = (name: string) =>
  name === NetworkName.Mainnet ? NetworkName.Tethys : NetworkName.Mainnet;

const SwitchButton = styled(Button)<{ fill?: string }>(({ theme, fill }) => ({
  width: 'fit-content',
  fontSize: '0.875rem',
  color: fill || theme.palette?.primary?.contrastText,
  gap: theme.spacing(1),
  margin: theme.spacing(0, 1),
}));

// export function NetworkSwitcher({
//   sx,
//   color,
//   hideText = false,
// }: {
//   sx?: SxProps;
//   color?: string;
//   hideText?: boolean;
// }) {
//   const { network, switchAndReset } = getSubsquidNetwork();

//   return (
//     <>
//       <SwitchButton
//         fill={color}
//         onClick={async () => switchAndReset(inverseNetworkName(network))}
//         sx={sx}
//       >
//         <SwitchArrowsIcon fill={color} />
//         {hideText ? null : `Switch to ${capitalize(inverseNetworkName(network))}`}
//       </SwitchButton>
//     </>
//   );
// }
