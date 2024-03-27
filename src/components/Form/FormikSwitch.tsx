import React from 'react';

import { Box, FormHelperText, Switch } from '@mui/material';

import { Label } from './FormikCheckBoxInput';

export function FormikSwitch({
  label,
  id,
  formik,
}: {
  id: string;
  label: string | React.ReactElement;
  formik?: any;
}) {
  const hasError = formik.touched[id] && Boolean(formik.errors[id]);

  return (
    <Box>
      <Label
        control={
          <Switch id={id} checked={formik.values[id]} onChange={formik.handleChange} name={id} />
        }
        label={label}
      />
      {hasError && <FormHelperText error={true}>{formik.errors[id]}</FormHelperText>}
    </Box>
  );
}
