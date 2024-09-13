import { Box, SxProps, Typography } from '@mui/material';

export function NoItems({ sx }: { sx?: SxProps }) {
  return (
    <Box
      className="no-items"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={sx}
    >
      <Typography>No items to show</Typography>
    </Box>
  );
}
