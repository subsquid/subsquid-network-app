import React from 'react';

import { TextField } from '@mui/material';

export function TextInput({
  label,
  id,
  value,
  onChange,
  error,
  helperText,
}: {
  id?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent) => unknown;
  helperText?: string;
  error?: boolean;
}) {
  return (
    <TextField
      id={id}
      onChange={onChange}
      fullWidth
      label={label}
      value={value}
      variant="filled"
      helperText={helperText}
      error={error}
    />
  );
}
