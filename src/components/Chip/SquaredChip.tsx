import { Chip as MaterialChip, styled, chipClasses, ChipProps } from '@mui/material';

export const SquaredChip = styled(MaterialChip)<ChipProps>(({ theme }) => ({
  borderRadius: 4,
  fontSize: 16,
  fontWeight: 600,

  [`& .${chipClasses.label}`]: {
    padding: theme.spacing(0, 0.5),
  },
}));
