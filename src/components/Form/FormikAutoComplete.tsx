import React from 'react';

import { Autocomplete } from '@mui/lab';
import { autocompleteClasses, styled, TextField } from '@mui/material';

const inputHeight = 54;
const FormikAutocomplete = styled(Autocomplete<{ label: string; value: string }>)(
  ({ theme }) => ({
    [`& .${autocompleteClasses.inputRoot}`]: {
      paddingTop: 16,
    },

    [`&.no-label .${autocompleteClasses.inputRoot}`]: {
      paddingTop: 0,
      paddingBottom: 0,
      height: inputHeight,
    },
    [`&.no-label .${autocompleteClasses.input}`]: {
      margin: theme.spacing(0.5, 0),
    },
  }),
  { name: 'FormikAutocompleteInput' },
);

export function FormikAutoComplete({
  label,
  id,
  formik,
  options,
  clearable,
}: {
  id: string;
  formik: any;
  options: { label: string; value: string }[];
  label?: string;
  clearable?: boolean;
}) {
  return (
    <FormikAutocomplete
      options={options}
      getOptionLabel={option => option.label}
      disableClearable={!clearable as any}
      onChange={(event, res) => {
        if (!res) return;

        formik.setFieldValue(id, res.value);
      }}
      value={options.find(v => v.value === formik.values[id])}
      renderInput={params => (
        <TextField
          {...params}
          className={label ? 'no-label' : undefined}
          label={label}
          variant="filled"
          InputProps={params.InputProps}
        />
      )}
    />
  );
}
