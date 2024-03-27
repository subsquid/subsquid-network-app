import React from 'react';

import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import { SxProps } from '@mui/material';
import { Link } from 'react-router-dom';

import { RoundIconButton } from '@components/RoundIconButton';

export function BackButton({ path, sx }: { path: string; sx?: SxProps }) {
  return (
    <Link to={path}>
      <RoundIconButton sx={sx}>
        <ArrowBack />
      </RoundIconButton>
    </Link>
  );
}
