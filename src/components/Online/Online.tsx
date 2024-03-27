import React from 'react';

import { StyledComponent } from '@emotion/styled';
import { Box, styled } from '@mui/material';

export const OnlineCircle = styled(Box, {
  name: 'OnlineCircle',
})(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '100%',
  outline: '1px solid #fff',

  '&.online': {
    background: theme.palette.success.main,
  },
  '&.offline': {
    background: theme.palette.error.main,
  },
}));

export function Online({
  online = true,
  Component = OnlineCircle,
}: {
  online?: boolean;
  Component?: StyledComponent<any>;
}) {
  return <Component className={online ? 'online' : 'offline'} />;
}
