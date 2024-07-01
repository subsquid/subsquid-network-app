import React from 'react';

import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  styled,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';

const FormSelect = styled(Select, {
  name: 'FormSelect',
})(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },

  '& .MuiSelect-select.MuiSelect-filled': {
    paddingTop: 22,
  },

  '&.Mui-disabled': {
    background: theme.palette.background.input,
    '&:hover': {
      border: `1px solid ${theme.palette.background.default}`,
    },
  },

  '& .MuiSvgIcon-root.Mui-disabled': {
    display: 'none',
  },
}));

export function FormikSelect({
  label,
  id,
  formik,
  options,
  disabled,
  showErrorOnlyOfTouched,
  onChange = event => {
    formik.setFieldValue(id, event.target.value);
  },
}: {
  id: string;
  formik: any;
  options: { label: React.ReactNode; value: string; disabled?: boolean }[];
  label?: string;
  disabled?: boolean;
  showErrorOnlyOfTouched?: boolean;
  onChange?: (event: SelectChangeEvent<any>) => unknown;
}) {
  const actualError =
    !showErrorOnlyOfTouched || (showErrorOnlyOfTouched && formik.touched[id])
      ? formik.errors[id]
      : null;

  return (
    <FormControl hiddenLabel={!label} variant="standard" fullWidth error={Boolean(actualError)}>
      {label && <InputLabel>{label}</InputLabel>}
      <FormSelect
        disabled={disabled}
        onChange={onChange}
        value={formik.values[id]}
        variant="filled"
      >
        {options.map(o => {
          return (
            <MenuItem disabled={o.disabled} key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          );
        })}
      </FormSelect>
      {actualError && <FormHelperText error={Boolean(actualError)}>{actualError}</FormHelperText>}
    </FormControl>
  );
}
