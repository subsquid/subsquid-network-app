import React, { useMemo } from 'react';

import { Avatar as MaterialAvatar, Box } from '@mui/material';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// const OnlineOnTop = styled(OnlineCircle, {
//   name: 'OnlineOnTop',
// })(() => ({
//   position: 'absolute',
//   right: 2,
//   bottom: 4,
// }));

export const Avatar = ({
  name,
  colorDescriminator = name,
  size = 44,
  variant,
  // online,
}: {
  name: string;
  colorDescriminator?: string;
  // online?: boolean;
  size?: number;
  variant?: 'circular' | 'rounded' | 'square';
}) => {
  const color = useMemo(() => {
    return stringToColor(colorDescriminator);
  }, [colorDescriminator]);

  return (
    <Box position="relative">
      <MaterialAvatar variant={variant} sx={{ bgcolor: color, width: size, height: size }}>
        {name.slice(0, 2).toUpperCase()}
      </MaterialAvatar>
      {/*{typeof online !== 'undefined' ? <Online Component={OnlineOnTop} online={online} /> : null}*/}
    </Box>
  );
};
