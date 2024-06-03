import { styled } from '@mui/material';
import { Box } from '@mui/system';

export function shortPeerId(p2pAddress: string) {
  if (p2pAddress.length < 8) {
    return '****';
  }

  return `${p2pAddress.slice(0, 4)}****${p2pAddress.slice(-4)}`;
}

export const PeerIdShort = styled(Box, {
  name: 'PeerIdShort',
})(() => ({
  minWidth: 90,
}));
