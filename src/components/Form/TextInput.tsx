import React from 'react';

import { TextField, TextFieldProps } from '@mui/material';

interface TextInputProps {
  id?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  sx?: TextFieldProps['sx'];
}

export function TextInput({
  label,
  id,
  value,
  onChange,
  error,
  helperText,
  disabled,
  multiline,
  rows,
  placeholder,
  sx,
}: TextInputProps) {
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
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      sx={sx}
    />
  );
}
