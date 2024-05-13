import '@rainbow-me/rainbowkit/styles.css';

import React, { PropsWithChildren, useEffect, useState } from 'react';

import {
  AppBar as AppBarMaterial,
  Box,
  IconButton,
  Slide,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/system/colorManipulator';
import classnames from 'classnames';
import { Outlet } from 'react-router-dom';
import { useDisconnect, useNetwork, useWalletClient } from 'wagmi';

import { Logo } from '@components/Logo';
import { NetworkSwitcher } from '@components/NetworkSwitcher';
import { TopBanner, useBannerHeight } from '@components/TopBanner';
import { demoFeaturesEnabled } from '@hooks/demoFeaturesEnabled';
import { MenuIcon } from '@icons/MenuIcon';
import { useAccount } from '@network/useAccount';
import { getChainId, getNetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork';

import { ColorVariant } from '../../theme';

import { NetworkMenu } from './NetworkMenu';
import { SyncSquidSnackbar } from './SyncSquidSnackbar';
import { UserMenu } from './UserMenu';

const APP_BAR_HEIGHT = 52;
const SIDEBAR_WIDTH = {
  M: 248,
  L: 320,
};

export const Main = styled('div', {
  name: 'Main',
})(({ theme }) => ({
  minHeight: '100%',
  background: theme.palette.background.paper,
  display: 'flex',
  flexFlow: 'column',
  position: 'relative',
}));

export const AppToolbar = styled(Box, { name: 'AppToolbar' })(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  height: APP_BAR_HEIGHT,
  paddingRight: theme.spacing(3),

  [theme.breakpoints.down('xs')]: {
    paddingRight: theme.spacing(2),
  },
}));

export const AppToolbarSidebar = styled('div', {
  name: 'AppToolbarSidebar',
})(({ theme }) => ({
  width: SIDEBAR_WIDTH.L,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),

  '& .MenuBurger path': {
    stroke: '#fff',
  },

  [theme.breakpoints.down('xl')]: {
    width: SIDEBAR_WIDTH.M,
  },

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    '&:after': {
      display: 'none',
    },
  },

  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
  },
}));

export const AppToolbarContent = styled('div', {
  name: 'AppToolbarContent',
})(({ theme }) => ({
  flex: 1,
  paddingLeft: theme.spacing(3),
  display: 'flex',
  justifyContent: 'flex-end',

  [theme.breakpoints.down('xl')]: {
    width: 'auto',
    borderRight: 'none',
    // paddingLeft: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(0),
  },
}));

export const Content = styled('div', {
  name: 'Content',
})(({ theme }) => {
  const bannerHeight = useBannerHeight();

  return {
    flex: 1,
    background: theme.palette.background.content,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: APP_BAR_HEIGHT + bannerHeight,
    paddingLeft: SIDEBAR_WIDTH.M,
    minWidth: 350,

    '&.narrow': {
      paddingLeft: 0,
    },

    [theme.breakpoints.up('xl')]: {
      paddingLeft: SIDEBAR_WIDTH.L,
    },
  };
});

export const ContentWrapper = styled('div', {
  name: 'ContentWrapper',
})(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  padding: theme.spacing(7.5),
  flex: '1',
  // alignSelf: 'center',
  color: alpha(theme.palette.text.primary, 0.8),
  maxWidth: '100%',

  [theme.breakpoints.up('xl')]: {
    maxWidth: 1200,
    boxSizing: 'content-box',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(7.5, 3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(7.5, 2),
  },
  [theme.breakpoints.down('xxs')]: {
    padding: theme.spacing(3, 2),
  },
}));

const Sidebar = styled('div', {
  name: 'Sidebar',
})(({ theme, color }) => {
  const variant: ColorVariant =
    color && color in theme.palette ? (color as ColorVariant) : 'primary';

  const bannerHeight = useBannerHeight();

  return {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'stretch',
    marginTop: APP_BAR_HEIGHT + bannerHeight,
    background: theme.palette.background.paper,
    position: 'fixed',
    top: 0,
    // paddingTop: theme.spacing(0),
    bottom: 0,
    paddingBottom: theme.spacing(3),
    zIndex: theme.zIndex.appBar - 1,
    boxShadow: '-5px 4px 20px rgba(0, 0, 0, 0.25)',
    width: SIDEBAR_WIDTH.M,
    overflowY: 'auto',

    [theme.breakpoints.up('xl')]: {
      width: SIDEBAR_WIDTH.L,
    },

    '&.guideActive': {
      zIndex: theme.zIndex.guide.highlight,
    },

    '& .MuiButtonBase-root:hover': {
      color: theme.palette[variant].main,
      '& path': {
        fill: theme.palette[variant].main,
      },
    },
    '& .MuiButtonBase-root.selected': {
      color: theme.palette[variant].contrastText,
      background: theme.palette[variant].main,
      '& path': {
        fill: theme.palette[variant].contrastText,
      },
    },
    '& .MuiButtonBase-root.selected:hover': {
      color: theme.palette[variant].contrastText,
      '& path': {
        fill: theme.palette[variant].contrastText,
      },
    },
  };
});

const AppBar = styled(AppBarMaterial, {
  name: 'AppBar',
})(({ theme }) => {
  return {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    background: theme.palette.info.main,
    zIndex: theme.zIndex.appBar,
    boxShadow: 'none',

    '&.guideActive': {
      zIndex: theme.zIndex.guide.highlight,
    },
  };
});

const AppToolbarDivider = styled('div', {
  name: 'AppToolbarContent',
})(({ theme }) => ({
  width: 1,
  height: 20,
  background: alpha(theme.palette.primary.contrastText, 0.6),
  margin: theme.spacing(0, 3),
}));

const MenuButton = styled(IconButton, {
  name: 'MenuButton',
})(({ theme }) => ({
  margin: theme.spacing(0, 0, 0, 1),
  transition: 'transform 300ms ease-out',

  '&.open': {
    transform: `rotateZ(90deg);`,
  },

  '& path': {
    stroke: theme.palette.primary.contrastText,
  },

  [theme.breakpoints.down('xs')]: {
    margin: 0,
  },
}));

export const NetworkLayout = ({
  children,
  stretchContent = true,
}: PropsWithChildren<{
  stretchContent?: boolean;
}>) => {
  const { isConnected } = useAccount();
  const { isLoading } = useWalletClient();
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { network, switchAndReset } = useSubsquidNetwork();

  useEffect(() => {
    if (!isConnected || isLoading) return;

    if (chain?.id === getChainId(network)) return;

    if (!chain?.unsupported && demoFeaturesEnabled()) {
      switchAndReset(getNetworkName(chain?.id));
      return;
    }

    disconnect();
  }, [chain, disconnect, isConnected, network, isLoading, switchAndReset]);

  const theme = useTheme();
  const narrowLg = useMediaQuery(theme.breakpoints.down('lg'));
  const narrowXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xxs'));

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const centeredSx = {
    alignSelf: stretchContent ? 'stretch' : 'flex-start',
  };

  return (
    <Main>
      <SyncSquidSnackbar />
      <AppBar>
        <TopBanner />
        <AppToolbar>
          <AppToolbarSidebar>
            {narrowXs ? null : <Logo />}
            {narrowLg ? (
              <MenuButton
                className={classnames({
                  open: isMenuOpen,
                })}
                onClick={() => setIsMenuOpen(open => !open)}
              >
                <MenuIcon />
              </MenuButton>
            ) : null}
          </AppToolbarSidebar>
          <AppToolbarContent />
          {demoFeaturesEnabled() ? <NetworkSwitcher hideText={isMobile} /> : null}
          {/*{narrowXs ? null : <AppToolbarDivider />}*/}
          {narrowXs ? <AppToolbarContent /> : null}
          <UserMenu />
        </AppToolbar>
      </AppBar>

      <Slide direction="right" in={!narrowLg || isMenuOpen} appear={false}>
        <Sidebar color="info">
          <NetworkMenu onItemClick={() => setIsMenuOpen(false)} />
        </Sidebar>
      </Slide>
      <Content className={classnames({ narrow: narrowLg })}>
        <ContentWrapper sx={centeredSx}>
          {children}
          <Outlet />
        </ContentWrapper>
      </Content>
    </Main>
  );
};
