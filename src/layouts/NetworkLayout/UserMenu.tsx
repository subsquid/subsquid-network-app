import React, { useCallback, useMemo, useRef, useState } from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { AccountBalanceWalletOutlined, ExpandMore } from '@mui/icons-material';
import { Box, Button, Menu, styled, Typography } from '@mui/material';
import { useAccount } from 'wagmi';

import ConnectButton from '@components/Button/ConnectButton';

import { LogoutMenuItem } from './LogoutMenuItem';

export const UserMenuStyled = styled(Menu, {
  name: 'UserMenuStyled',
})(() => ({
  minWidth: '100%',
}));

export const Dropdown = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  textAlign: 'left',
}));

export function UserMenu() {
  const { address, isConnected } = useAccount();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const maskedAddress = useMemo(() => {
    return address ? addressFormatter(address, true) : '';
  }, [address]);

  if (!address || !isConnected) {
    return <ConnectButton />;
  }

  return (
    <>
      <Dropdown
        onClick={handleOpen}
        ref={ref}
        color="primary"
        variant="contained"
        startIcon={<AccountBalanceWalletOutlined />}
        endIcon={
          <ExpandMore
            sx={{
              transition: 'transform 300ms ease-out',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              color: 'primary.contrastText',
              // opacity: 0.2,
              width: 20,
              height: 20,
            }}
          />
        }
      >
        <Typography variant="body2">{maskedAddress}</Typography>
      </Dropdown>
      <UserMenuStyled
        anchorEl={ref.current}
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        disableAutoFocus
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
              width: 256,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <Box sx={{ m: 1 }}>
          <LogoutMenuItem />
        </Box>
      </UserMenuStyled>
    </>
  );
}
