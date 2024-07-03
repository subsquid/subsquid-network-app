import { MouseEventHandler } from 'react';

import { Button } from '@mui/material';

import { WalletIcon } from '@icons/WalletIcon';

function ConnectButton({ onClick }: { onClick?: MouseEventHandler }) {
  return (
    <Button startIcon={<WalletIcon />} onClick={onClick} variant="contained" color="info">
      CONNECT WALLET
    </Button>
  );
}

export default ConnectButton;
