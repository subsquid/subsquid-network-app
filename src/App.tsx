import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import { queryClient } from '@api/client';
import { Alert } from '@components/Alert';
import { SquidHeightProvider } from '@hooks/useSquidNetworkHeightHooks';
import { rainbowConfig } from '@network/config';

import { AppRoutes } from './AppRoutes';
import { useCreateRainbowKitTheme, useCreateTheme, useThemeState } from './theme';

function App() {
  const [themeName] = useThemeState();
  const theme = useCreateTheme(themeName);
  const rainbowkitTheme = useCreateRainbowKitTheme(themeName);

  return (
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={queryClient}>
        <SquidHeightProvider>
          <ThemeProvider theme={theme}>
            <RainbowKitProvider modalSize="compact" theme={rainbowkitTheme}>
              <SnackbarProvider
                hideIconVariant
                preventDuplicate
                maxSnack={3}
                Components={{
                  subsquid: Alert,
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <CssBaseline />
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </SnackbarProvider>
            </RainbowKitProvider>
          </ThemeProvider>
        </SquidHeightProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
