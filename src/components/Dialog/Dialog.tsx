import { Dialog as DialogMui, styled } from '@mui/material';

export const Dialog = styled(DialogMui, {
  name: 'Dialog',
})(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(5px)',
    backgroundColor:
      theme.palette.mode === 'light' ? 'rgba(166, 166, 166, 0.6)' : 'rgba(0, 0, 0, 0.2);',
  },
}));
