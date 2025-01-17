import React, { useState } from 'react';

import {
  styled,
  SxProps,
  TextField as MaterialTextField,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';

import { VisibleIcon } from '@icons/VisibleIcon';
import { VisibleOffIcon } from '@icons/VisibleOffIcon';

export const TextField = styled(MaterialTextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.down('xxs')]: {
    '& .MuiInputLabel-root': {
      left: '4px',
      fontSize: '14px',
    },
    '& .MuiFilledInput-input': {
      paddingLeft: '16px',
      fontSize: '14px',
    },
  },
}));

export function FormikTextInput({
  label,
  id,
  formik,
  multiline,
  rows,
  minRows,
  maxRows,
  variant,
  helperText = '',
  placeholder,
  type = 'text',
  InputProps,
  error,
  sx,
  autoComplete,
  onFocus,
  onBlur,
  showErrorOnlyOfTouched = false,
  disabled,
}: {
  id: string;
  label?: React.ReactNode;
  formik?: any;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  variant?: 'paper';
  helperText?: string;
  showErrorOnlyOfTouched?: boolean;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'password';
  sx?: SxProps;
  InputProps?: Partial<StandardInputProps>;
  autoComplete?: string;
  onFocus?: () => unknown;
  onBlur?: () => unknown;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  const actualError = error
    ? error
    : !showErrorOnlyOfTouched || (showErrorOnlyOfTouched && formik.touched[id])
      ? formik.errors[id]
      : null;

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel shrink>{label}</InputLabel>
      <TextField
        id={id}
        fullWidth
        className={variant}
        type={visible ? 'text' : type}
        variant="filled"
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        rows={rows}
        placeholder={placeholder}
        value={formik.values[id] ? formik.values[id] : ''}
        onChange={formik.handleChange}
        onBlur={e => {
          formik.handleBlur(e);
          onBlur?.();
        }}
        onFocus={onFocus}
        error={Boolean(actualError)}
        sx={sx}
        helperText={actualError || helperText}
        autoComplete={autoComplete}
        InputProps={
          InputProps || {
            endAdornment:
              type === 'password' ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisible(!visible)} edge="end" sx={{ mr: '-5px' }}>
                    {visible ? <VisibleOffIcon /> : <VisibleIcon />}
                  </IconButton>
                </InputAdornment>
              ) : undefined,
          }
        }
        disabled={disabled}
      />
    </FormControl>
  );
}
