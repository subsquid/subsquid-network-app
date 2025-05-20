import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: 6,
    color: theme.palette.text.primary,
  },
}));
