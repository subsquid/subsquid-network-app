import React from 'react';

import {
  Box,
  Checkbox,
  FormControlLabel,
  formControlLabelClasses,
  FormHelperText,
  styled,
} from '@mui/material';

export const Label = styled(FormControlLabel)(({ theme: { palette, breakpoints } }) => ({
  marginRight: 0,
  marginLeft: -10,
  // marginBottom: spacing(1),
  [`& .${formControlLabelClasses.label}`]: {
    fontSize: '0.85rem',
    color: palette.text.secondary,
  },
  [breakpoints.down('xxs')]: {
    [`& .${formControlLabelClasses.label}`]: {
      lineHeight: 1.5,
      fontSize: '14px',
    },
  },
}));

export function FormikCheckBoxInput({
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
          <Checkbox id={id} checked={formik.values[id]} onChange={formik.handleChange} name={id} />
        }
        label={label}
      />
      {hasError && <FormHelperText error={true}>{formik.errors[id]}</FormHelperText>}
    </Box>
  );
}
