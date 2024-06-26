import { alpha } from '@mui/system/colorManipulator';

export const NetworkLightTheme = {
  primary: {
    main: '#d5d8dd',
    contrastText: '#3E4A5C',
  },
  secondary: {
    main: '#8596ad',
  },
  info: {
    light: '#3880EC',
    main: '#2c2c2c',
    contrastText: '#fff',
  },
  success: {
    main: '#e3f7e0',
    contrastText: '#248a0f',
  },
  error: {
    main: '#ff2a00',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffa800',
    contrastText: '#fff',
  },
  importantLink: {
    main: '#3880EC',
  },
  text: {
    primary: '#0d0d0d',
    secondary: '#3e4a5c',
    default: alpha('#1D1D1F', 0.8),
    disabled: alpha('#1D1D1F', 0.3),
  },
  background: {
    default: '#ffffff',
    paper: '#f0f2f5',
  },
  divider: '#C2CAD6',
  code: {
    background: '#FBFBFB',
    border: alpha('#1D1D1F', 0.1),
  },
  alerts: {
    // info: {
    //   background: '#E8E7E7',
    //   text: '#231F20',
    // },
    // success: {
    //   background: '#96F3C6',
    //   text: '#231F20',
    // },
    warning: {
      background: '#FCE38E',

      text: '#231F20',
    },
    // error: {
    //   background: '#FBB9B2',
    //   contrastText: '#CA0E01',
    //   text: '#231F20',
    // },
  },
  networkStatus: {
    online: '#65C971',
    downtime: '#FE8E0A',
    offline: '#D65745',
    noData: '#B4BAC4',
  },
  accent: {
    light: '#569AFF',
    main: '#EBF2FD',
    contrastText: '#3880EC',
    dark: '#1055BD',
  },
  grayScale: {
    gray500: '#7E7E7E',
    gray800: '#DEDEDE',
  },
};
