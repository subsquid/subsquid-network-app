import { IconButton, iconButtonClasses, styled } from '@mui/material';

export const RoundIconButton = styled(IconButton)(({ theme: { palette } }) => ({
  color: palette.primary.contrastText,
  width: 32,
  height: 32,
  transition: 'all 300ms ease-out',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: palette.secondary.main,

  '&.transparent': {
    background: 'transparent',
    color: palette.text.primary,
    opacity: 0.6,
  },

  // '&:hover': {
  //   background: palette.primary.light,
  //   color: palette.primary.contrastText,
  //   opacity: 1,
  // },

  [`&.${iconButtonClasses.sizeMedium}`]: {
    width: 32,
    height: 32,
    '& svg': {
      width: 20,
      height: 20,
      marginLeft: -2,
    },
  },

  [`&.${iconButtonClasses.sizeSmall}`]: {
    width: 24,
    height: 24,
    '& svg': {
      width: 18,
      height: 18,
    },
  },
}));
