import React from 'react';

import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import { SxProps } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { RoundIconButton } from '@components/RoundIconButton';

export function BackButton({ path, sx }: { path?: string; sx?: SxProps }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <RoundIconButton
      sx={sx}
      onClick={() => {
        if (location.key !== 'default') {
          navigate(-1);
        } else {
          navigate(path || '/', { replace: true });
        }
      }}
    >
      <ArrowBack />
    </RoundIconButton>
  );
}
