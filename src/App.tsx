import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import { queryClient } from '@api/client';
import { Alert } from '@components/Alert';
import { wagmiConfig } from '@network/config';

import { AppRoutes } from './AppRoutes';
import { useCreateTheme, useThemeState } from './theme';

function App() {
  const [themeName] = useThemeState();
  const theme = useCreateTheme(themeName);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RainbowKitProvider modalSize="compact">
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
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
