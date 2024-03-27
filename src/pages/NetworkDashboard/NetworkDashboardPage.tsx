import React from 'react';

import { Box, styled } from '@mui/material';

import { CenteredPageWrapper, PageTitle } from '@layouts/NetworkLayout';

const PanelsWrapper = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(10),
}));

const NetworkDashboardPage = () => {
  return (
    <CenteredPageWrapper>
      <PageTitle title="Dashboard" />
      <PanelsWrapper></PanelsWrapper>
    </CenteredPageWrapper>
  );
};

export default NetworkDashboardPage;
