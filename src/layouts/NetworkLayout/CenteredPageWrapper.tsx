import { styled } from '@mui/material';

export const CenteredPageWrapper = styled('div', {
  name: 'CenteredPageWrapper',
})(({ theme: { breakpoints } }) => ({
  maxWidth: 800,
  margin: '0 auto',

  '&.wide': {
    maxWidth: 1200,

    [breakpoints.down('lg')]: {
      maxWidth: 800,
    },
  },
}));
