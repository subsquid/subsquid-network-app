import React, { PropsWithChildren, SyntheticEvent } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import SquaredChip from '@components/Chip/SquaredChip.tsx';
import { Dialog } from '@components/Dialog';
import { CloseIcon } from '@icons/CloseIcon.tsx';

export const ConfirmWrapper = styled(Box, {
  name: 'ConfirmWrapper',
})(({ theme }) => ({}));

export const ConfirmDialogTitle = styled(Box, {
  name: 'ConfirmDialogTitle',
})(({ theme: { spacing, breakpoints } }) => ({
  margin: spacing(3.5, 4, 2.5),
  padding: 0,
  fontWeight: 500,
  fontSize: '1.125rem',
  position: 'relative',
  paddingRight: 45,
  [breakpoints.down('sm')]: {
    margin: spacing(4, 3, 2, 3),
    fontSize: '1rem',
  },
}));

export const CloseIconButton = styled(IconButton, {
  name: 'CloseIconButton',
})(({ theme: { spacing, breakpoints } }) => ({
  position: 'absolute',
  top: -6,
  right: -6,
  opacity: 0.5,
  padding: 0,
  // [breakpoints.down('xxs')]: {
  //   paddingLeft: '10px',
  // },
}));

export const Content = styled(DialogContent)(({ theme: { spacing, breakpoints } }) => ({
  padding: 0,
  margin: spacing(1, 4, 4),
  overflowY: 'visible',
  [breakpoints.down('sm')]: {
    margin: spacing(0, 3, 4, 3),
  },
}));
export const Actions = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: spacing(2),
  margin: spacing(4, 4),
  '* > :not(:first-of-type)': {
    marginLeft: 0,
  },
  [breakpoints.down('sm')]: {
    margin: spacing(3, 3),
  },
}));

export type ConfirmDialogProps = {
  title: string;
  open: boolean;
  maxWidth?: string | number;
  minWidth?: string | number;
  confirmColor?: 'primary' | 'error' | 'success' | 'info';
  confirmButtonText?: string;
  cancelButtonText?: string;
  disableBackdropClick?: boolean;
  disableConfirmButton?: boolean;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  onResult?: (confirmed: boolean) => unknown;
  onApprove?: () => unknown;
  loading?: boolean;
};

export function ConfirmDialog({
  title,
  children,
  open,
  maxWidth = 440,
  minWidth = 440,
  confirmColor = 'info',
  confirmButtonText = 'CONFIRM',
  cancelButtonText = 'CANCEL',
  disableBackdropClick = false,
  disableConfirmButton = false,
  hideCancelButton = false,
  hideConfirmButton = false,
  loading = false,
  onResult,
  onApprove,
}: PropsWithChildren<ConfirmDialogProps>) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const onReject = (e: SyntheticEvent, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') return;

    onResult?.(false);
  };
  const handleApprove = () => {
    onApprove?.();
    onResult?.(true);
  };
  const onClick = (event: React.UIEvent) => {
    event.stopPropagation();
  };

  return (
    <Dialog open={open} onClick={onClick} onClose={onReject} disableAutoFocus disableEnforceFocus>
      <ConfirmWrapper
        sx={{
          maxWidth: !mobile ? maxWidth : undefined,
          minWidth: !mobile ? minWidth : undefined,
        }}
      >
        <ConfirmDialogTitle>
          <SquaredChip label={title} color="primary" />
          <CloseIconButton onClick={onReject}>
            <CloseIcon />
          </CloseIconButton>
        </ConfirmDialogTitle>
        <Content>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
        </Content>
        <Actions>
          {!hideCancelButton ? (
            <Button onClick={onReject} fullWidth variant="contained" color="primary">
              {cancelButtonText}
            </Button>
          ) : null}
          {!hideConfirmButton ? (
            <LoadingButton
              onClick={handleApprove}
              disabled={disableConfirmButton}
              loading={loading}
              color={confirmColor}
              variant="contained"
            >
              {confirmButtonText}
            </LoadingButton>
          ) : null}
        </Actions>
      </ConfirmWrapper>
    </Dialog>
  );
}
