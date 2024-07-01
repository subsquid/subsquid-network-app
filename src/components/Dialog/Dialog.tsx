import { Dialog as DialogMui, styled } from '@mui/material';

export const Dialog = styled(DialogMui, {
  name: 'Dialog',
})(({ theme }) => ({
  '& .MuiBackdrop-root': {
    // backdropFilter: 'blur(1px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));
