import { alpha } from '@mui/system/colorManipulator';

export const NetworkLightTheme = {
  primary: {
    main: '#000000',
    light: '#333333',
    contrastText: '#fff',
  },
  secondary: {
    main: '#E8CDEB',
    contrastText: '#B721FD',
  },
  info: {
    light: '#3880EC',
    main: '#2c2c2c',
    contrastText: '#fff',
  },
  success: {
    light: '#55AD44',
    main: '#1FB48E',
    dark: '#148568',
    contrastText: '#fff',
  },
  error: {
    main: '#FD6E65',
    dark: '#E7362B',
    contrastText: '#fff',
  },
  warning: {
    main: '#F5EDBF',
    contrastText: '#DC9101',
    dark: '#F90',
  },
  importantLink: {
    main: '#3880EC',
    hover: '#66a0f5',
  },
  text: {
    primary: '#1D1D1F',
    secondary: alpha('#1D1D1F', 0.5),
    default: alpha('#1D1D1F', 0.8),
    disabled: alpha('#1D1D1F', 0.3),
  },
  background: {
    default: '#f2f2f2',
    paper: '#fff',
    input: '#f2f2f2',
    content: '#f6f8fb',
  },
  divider: '#e8e8e8',
  code: {
    background: '#FBFBFB',
    border: alpha('#1D1D1F', 0.1),
  },
  alerts: {
    info: {
      background: '#E8E7E7',
      text: '#231F20',
    },
    success: {
      background: '#96F3C6',
      text: '#231F20',
    },
    warning: {
      background: '#FCE38E',

      text: '#231F20',
    },
    error: {
      background: '#FBB9B2',
      contrastText: '#CA0E01',
      text: '#231F20',
    },
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
