import { Chip as MaterialChip, styled, chipClasses } from '@mui/material';

const SquaredChip = styled(MaterialChip)(({ theme }) => ({
  borderRadius: 4,
  fontSize: 16,
  fontWeight: 600,

  [`& .${chipClasses.label}`]: {
    padding: theme.spacing(0, 0.5),
  },
}));

export default SquaredChip;
