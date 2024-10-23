import React from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import { queryClient } from '@api/client';
import { Toaster } from '@components/Toaster';
import { SquidHeightProvider } from '@hooks/useSquidNetworkHeightHooks';
import { rainbowConfig } from '@network/config';
import { getChainId, getSubsquidNetwork } from '@network/useSubsquidNetwork';

import { AppRoutes } from './AppRoutes';
import { useCreateRainbowKitTheme, useCreateTheme, useThemeState } from './theme';

function App() {
  const [themeName] = useThemeState();
  const theme = useCreateTheme(themeName);
  const rainbowkitTheme = useCreateRainbowKitTheme(themeName);
  const network = getSubsquidNetwork();

  return (
    <>
      <WagmiProvider config={rainbowConfig} reconnectOnMount>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RainbowKitProvider
              modalSize="compact"
              theme={rainbowkitTheme}
              initialChain={getChainId(network)}
            >
              <SquidHeightProvider>
                <CssBaseline />
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </SquidHeightProvider>
              {/* </SnackbarProvider> */}
            </RainbowKitProvider>
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
