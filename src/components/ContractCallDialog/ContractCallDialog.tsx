import React, { PropsWithChildren } from 'react';

import { Box, Button } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { ConfirmDialog, ConfirmDialogProps } from '@components/ConfirmDialog';
import { WalletIcon } from '@icons/WalletIcon';

export function ContractCallDialog({
  title,
  children,
  open,
  maxWidth,
  minWidth = 600,
  confirmColor = 'primary',
  confirmButtonText = title,
  cancelButtonText = 'Cancel',
  hideCancelButton = true,
  disableBackdropClick = true,
  disableConfirmButton = false,
  loading = false,
  onResult,
  onApprove,
}: PropsWithChildren<ConfirmDialogProps>) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <ConfirmDialog
        title={title}
        maxWidth={maxWidth}
        minWidth={minWidth}
        open={open}
        onResult={onResult}
        loading={loading}
        confirmColor={confirmColor}
        confirmButtonText={confirmButtonText}
        hideCancelButton={hideCancelButton}
        disableBackdropClick={disableBackdropClick}
        disableConfirmButton={disableConfirmButton}
        onApprove={onApprove}
        cancelButtonText={cancelButtonText}
        hideConfirmButton
      >
        <Box
          sx={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ mb: 2 }}>Connect your wallet to proceed</Box>
            <Button variant="contained" startIcon={<WalletIcon />} onClick={openConnectModal}>
              Connect wallet
            </Button>
          </Box>
        </Box>
      </ConfirmDialog>
    );
  }

  return (
    <ConfirmDialog
      title={title}
      maxWidth={maxWidth}
      minWidth={minWidth}
      open={open}
      onResult={onResult}
      loading={loading}
      confirmColor={confirmColor}
      confirmButtonText={confirmButtonText}
      hideCancelButton={hideCancelButton}
      disableBackdropClick={disableBackdropClick}
      disableConfirmButton={disableConfirmButton}
      onApprove={onApprove}
      cancelButtonText={cancelButtonText}
    >
      {children}
    </ConfirmDialog>
  );
}
