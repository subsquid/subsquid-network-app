import React, { PropsWithChildren } from 'react';

import { Box } from '@mui/material';
import { useAccount } from 'wagmi';

import ConnectButton from '@components/Button/ConnectButton';
import { ConfirmDialog, ConfirmDialogProps } from '@components/ConfirmDialog';

export function ContractCallDialog({
  title,
  children,
  open,
  maxWidth,
  minWidth = 600,
  confirmColor = 'info',
  confirmButtonText,
  cancelButtonText,
  hideCancelButton = true,
  disableBackdropClick = false,
  disableConfirmButton = false,
  loading = false,
  onResult,
  onApprove,
}: PropsWithChildren<ConfirmDialogProps>) {
  const { isConnected } = useAccount();

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
            <ConnectButton />
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
