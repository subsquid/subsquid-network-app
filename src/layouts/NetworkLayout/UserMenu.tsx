import React, { useCallback, useMemo, useRef, useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Menu, Stack, styled } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { WalletIcon } from '@icons/WalletIcon.tsx';

import { LogoutMenuItem } from './LogoutMenuItem';

export const UserMenuStyled = styled(Menu, {
  name: 'UserMenuStyled',
})(() => ({
  minWidth: '100%',
}));

export const ConnectButton = styled(Button, {
  name: 'ConnectButton',
})(({ theme }) => ({
  color: theme.palette.info.contrastText,
}));

export const Dropdown = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  textAlign: 'left',
}));

export function UserMenu() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const maskedAddress = useMemo(() => {
    return address ? `${address.substring(0, 4)}...${address?.slice(-4)}` : '';
  }, [address]);

  if (!address || !isConnected) {
    return (
      <ConnectButton startIcon={<WalletIcon />} onClick={openConnectModal}>
        Connect wallet
      </ConnectButton>
    );
  }

  return (
    <>
      <Stack
        component={Dropdown}
        direction="row"
        onClick={handleOpen}
        alignItems="center"
        ref={ref}
      >
        <Box>{maskedAddress}</Box>
        <ExpandMore
          sx={{
            transition: 'transform 300ms ease-out',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'primary.contrastText',
            // opacity: 0.2,
            ml: 2,
            width: 20,
            height: 20,
          }}
        />
      </Stack>
      <UserMenuStyled
        anchorEl={ref.current}
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        disableAutoFocus
        PaperProps={{
          sx: {
            overflow: 'visible',
            width: 261,
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
        <Box sx={{ ml: 2, mr: 2, mb: 2 }}>
          <LogoutMenuItem />
        </Box>
      </UserMenuStyled>
    </>
  );
}
