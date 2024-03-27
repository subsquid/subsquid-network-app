import React, { forwardRef } from 'react';

import { Alert as MaterialAlert, styled } from '@mui/material';
import { InternalSnack, SnackbarContentProps, useSnackbar } from 'notistack';

export const AlertTitle = styled('div', {
  name: 'AlertTitle',
})(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1.125rem',
  marginBottom: theme.spacing(1),
  maxWidth: 360,
}));

export const AlertMessage = styled('div', {
  name: 'AlertMessage',
})(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'normal',
  maxWidth: 360,
}));

export const Alert = forwardRef(
  (
    {
      id,
      severity,
      title,
      message,
    }: {
      title?: string;
      severity: 'warning';
    } & InternalSnack,
    ref,
  ) => {
    const { closeSnackbar } = useSnackbar();

    return (
      <MaterialAlert
        ref={ref as any}
        variant="filled"
        severity={severity}
        onClose={() => closeSnackbar(id)}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertMessage>{message}</AlertMessage>
      </MaterialAlert>
    );
  },
);
