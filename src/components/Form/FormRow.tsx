import { styled } from '@mui/material';

export const FormRow = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  marginBottom: spacing(2),
  marginTop: spacing(2),

  [breakpoints.down('xxs')]: {
    marginBottom: spacing(1.5),
    marginTop: spacing(1.5),
  },
}));

export const FormSubmitRow = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  marginBottom: spacing(3),
  marginTop: spacing(3),
  [breakpoints.down('xxs')]: {
    marginTop: spacing(4),
  },
}));
