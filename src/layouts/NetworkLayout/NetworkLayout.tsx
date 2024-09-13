import '@rainbow-me/rainbowkit/styles.css';

import { PropsWithChildren, useEffect, useState } from 'react';

import {
  AppBar as AppBarMaterial,
  Backdrop,
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
import { useDisconnect, useWalletClient } from 'wagmi';

import { Logo } from '@components/Logo';
// import { NetworkSwitcher } from '@components/NetworkSwitcher';
import { useBannerHeight } from '@components/TopBanner';
import { MenuIcon } from '@icons/MenuIcon';
import { useAccount } from '@network/useAccount';
import { getChainId, getSubsquidNetwork } from '@network/useSubsquidNetwork';

import { ColorVariant } from '../../theme';

import { NetworkMenu } from './NetworkMenu';
import { SyncSquidSnackbar } from './SyncSquidSnackbar';
import { UserMenu } from './UserMenu';

const APP_BAR_HEIGHT = 60;
const SIDEBAR_WIDTH = {
  M: 56,
  L: 240,
};

export const Main = styled('div', {
  name: 'Main',
})(({ theme }) => ({
  minHeight: '100%',
  background: theme.palette.background.default,
  display: 'flex',
  flexFlow: 'column',
  position: 'relative',
  overflowX: 'clip',
}));

export const AppToolbar = styled(Box, { name: 'AppToolbar' })(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  height: APP_BAR_HEIGHT,
  paddingRight: theme.spacing(3),
  marginLeft: 12,

  [theme.breakpoints.down('xs')]: {
    paddingRight: theme.spacing(2),
  },
}));

export const AppToolbarSidebar = styled('div', {
  name: 'AppToolbarSidebar',
})(({ theme }) => ({
  width: theme.spacing(7),
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),

  '& .MenuBurger path': {
    stroke: '#fff',
  },

  [theme.breakpoints.down('md')]: {
    // width: 'auto',
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
  justifyContent: 'flex-start',
  fontWeight: 500,
  fontSize: 32,
}));

export const Content = styled('div', {
  name: 'Content',
})(({ theme }) => {
  const bannerHeight = useBannerHeight();

  return {
    flex: 1,
    // background: theme.palette.background.content,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: APP_BAR_HEIGHT + bannerHeight,
    paddingLeft: 0,
    paddingBottom: theme.spacing(8),
    minWidth: 350,

    [theme.breakpoints.up('xl')]: {
      paddingLeft: SIDEBAR_WIDTH.L,
    },
  };
});

export const ContentWrapper = styled('div', {
  name: 'ContentWrapper',
})(({ theme }) => ({
  margin: theme.spacing(0, 'auto'),
  padding: theme.spacing(2),
  flex: '1',
  // alignSelf: 'center',
  // color: alpha(theme.palette.text.primary, 0.8),
  maxWidth: '100%',
  overflowX: 'visible',

  [theme.breakpoints.up('xl')]: {
    maxWidth: 1336,
    boxSizing: 'content-box',
  },
  // [theme.breakpoints.down('md')]: {
  //   padding: theme.spacing(7.5, 3),
  // },
  // [theme.breakpoints.down('sm')]: {
  //   padding: theme.spacing(3, 2),
  // },
}));

const Sidebar = styled('div', {
  name: 'Sidebar',
})(({ theme, color }) => {
  const variant: ColorVariant =
    color && color in theme.palette ? (color as ColorVariant) : 'primary';

  const bannerHeight = useBannerHeight();

  return {
    // borderRight: `solid ${theme.palette.divider} 1px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    // marginTop: APP_BAR_HEIGHT + bannerHeight,
    background: theme.palette[variant].main,
    position: 'fixed',
    top: 0,
    // paddingLeft: theme.spacing(1),
    // paddingTop: theme.spacing(1),
    bottom: 0,
    // paddingBottom: theme.spacing(3),
    zIndex: theme.zIndex.appBar + 1,
    // boxShadow: '-5px 4px 20px rgba(0, 0, 0, 0.25)',
    width: SIDEBAR_WIDTH.L,
    overflowY: 'auto',
    overflowX: 'hidden',

    // [theme.breakpoints.up('xl')]: {
    //   width: SIDEBAR_WIDTH.L,
    // },

    '&.guideActive': {
      zIndex: theme.zIndex.guide.highlight,
    },

    '& .MuiButtonBase-root': {
      color: theme.palette[variant].contrastText,
      '& path': {
        fill: theme.palette[variant].contrastText,
      },
    },
    // '& .MuiButtonBase-root:hover': {
    //   color: theme.palette[variant].light,
    //   '& path': {
    //     fill: theme.palette[variant].light,
    //   },
    // },
    '& .MuiButtonBase-root.selected': {
      color: theme.palette.text.primary,
      '& path': {
        fill: theme.palette.text.primary,
      },
    },
    // '& .MuiButtonBase-root.selected:hover': {
    //   color: theme.palette[variant].light,
    //   '& path': {
    //     fill: theme.palette[variant].light,
    //   },
    // },
  };
});

const SidebarLogo = styled('div', {
  name: 'SidebarLogo',
})(({ theme, color }) => {
  return {
    display: 'flex',
    height: APP_BAR_HEIGHT,
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 2),
  };
});

const AppBar = styled(AppBarMaterial, {
  name: 'AppBar',
})(({ theme }) => {
  return {
    zIndex: theme.zIndex.appBar,
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
  const theme = useTheme();
  const narrow = useMediaQuery(theme.breakpoints.down('xl'));

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const walletClient = useWalletClient();
  const { isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const network = getSubsquidNetwork();

  useEffect(() => {
    if (!isConnected) return;
    if (chain?.id === getChainId(network)) return;

    disconnect();
  }, [isConnected, chain, disconnect, walletClient, network]);

  const centeredSx = {
    alignSelf: stretchContent ? 'stretch' : 'flex-start',
  };

  return (
    <Main>
      <SyncSquidSnackbar />
      {/* <TopBanner /> */}
      <AppBar>
        <AppToolbar>
          {/* <AppToolbarSidebar> */}
          {/* {narrowXs ? null : <Logo />} */}
          {/* {narrowLg ? (
  
            ) : null} */}
          {/* </AppToolbarSidebar> */}
          <MenuButton
            className={classnames({
              open: isMenuOpen,
            })}
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <MenuIcon />
          </MenuButton>
          <AppToolbarContent></AppToolbarContent>
          {/* <NetworkSwitcher hideText={isMobile} /> */}
          {/*{narrowXs ? null : <AppToolbarDivider />}*/}
          {narrow ? <AppToolbarContent /> : null}
          <UserMenu />
          <Backdrop
            open={isMenuOpen}
            onClick={() => setIsMenuOpen(false)}
            sx={{ background: '#fff0' }}
          />
        </AppToolbar>
      </AppBar>

      <Slide direction="right" in={!narrow || isMenuOpen} appear={false}>
        <Sidebar>
          <SidebarLogo>
            <Logo />
          </SidebarLogo>
          <NetworkMenu onItemClick={() => setIsMenuOpen(false)} />
        </Sidebar>
      </Slide>
      <Content>
        <ContentWrapper sx={centeredSx}>
          {children}
          <Outlet />
        </ContentWrapper>
      </Content>
    </Main>
  );
};
