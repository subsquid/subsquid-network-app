import { MouseEventHandler } from 'react';

import { LoginOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

function ConnectButton({ onClick }: { onClick?: MouseEventHandler }) {
  return (
    <Button startIcon={<LoginOutlined />} onClick={onClick} variant="contained" color="info">
      CONNECT WALLET
    </Button>
  );
}

export default ConnectButton;
