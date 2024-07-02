import { useMemo } from 'react';

import { AppBarPropsColorOverrides } from '@mui/material/AppBar/AppBar';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import { OverridableStringUnion } from '@mui/types';

import { localStorageStringSerializer, useLocalStorageState } from '@hooks/useLocalStorageState';

import { NetworkLightTheme } from './network-light';

const COLORS = {
  light: NetworkLightTheme,
  dark: NetworkLightTheme,
};

export type PaletteType = 'light' | 'dark';

const loader = document.getElementById('loader');

const defaultTheme = 'light';

export function useThemeState(): [PaletteType, (palette: PaletteType) => void] {
  const [theme, setThemeName] = useLocalStorageState<'light' | 'dark'>('theme', {
    serializer: localStorageStringSerializer,
    defaultValue: defaultTheme,
  });

  const parsedTheme = ['dark', 'light'].includes(theme) ? theme : defaultTheme;

  return [
    parsedTheme,
    theme => {
      if (theme === 'dark') {
        loader?.classList.add('dark');
      } else {
        loader?.classList.remove('dark');
      }

      setThemeName(theme);
    },
  ];
}

const spacing = 8;

declare module '@mui/material' {
  export interface ZIndex {
    guide: {
      background: number;
      highlight: number;
      content: number;
    };
  }

  export interface BreakpointOverrides {
    xxs: true;
  }

  export interface AppBarPropsColorOverrides {
    info: true;
  }

  export interface ChipPropsVariantOverrides {
    squared: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    input: string;
    content: string;
  }

  export interface TypeText {
    default: string;
  }

  export interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    background: string;
  }

  export interface Palette {
    importantLink: PaletteColor;
    code: {
      background: string;
      border: string;
    };
    alerts: {
      error: {
        background: string;
        text: string;
        contrastText: string;
      };
    };
    networkStatus: {
      online: string;
      offline: string;
      downtime: string;
      noData: string;
    };
    accent: {
      light: string;
      main: string;
      contrastText: string;
      dark: string;
    };
    grayScale: {
      gray500: string;
      gray800: string;
    };
  }
  export interface PaletteOptions {
    importantLink: PaletteColorOptions;
    code: {
      background: string;
      border: string;
    };
    alerts: {
      warning: {
        background: string;
        text: string;
      };
    };
    networkStatus: {
      online: string;
      offline: string;
      downtime: string;
      noData: string;
    };
    accent: {
      light: string;
      main: string;
      contrastText: string;
      dark: string;
    };
    grayScale: {
      gray500: string;
      gray800: string;
    };
  }
}

declare module 'notistack' {
  interface VariantOverrides {
    subsquid: {
      title: string;
      severity: 'warning' | 'success' | 'error' | 'info';
    };
  }
}

const fontFamily = `'Matter'`;

export type ColorVariant = OverridableStringUnion<
  'primary' | 'secondary',
  AppBarPropsColorOverrides
>;

export const useCreateTheme = (mode: PaletteType) => {
  const colors = COLORS[mode];

  return useMemo(
    () =>
      createMuiTheme({
        breakpoints: {
          values: {
            xxs: 480,
            xs: 600,
            sm: 800,
            md: 1000,
            lg: 1200,
            xl: 1536,
          },
        },
        typography: {
          fontFamily,
          h1: {
            fontSize: 64,
            lineHeight: 1,
            fontWeight: 500,
            color: colors.text.primary,
            letterSpacing: '-0.01rem',
          },
          h2: {
            fontSize: 40,
            lineHeight: 1,
            fontWeight: 500,
            color: colors.text?.primary,
            letterSpacing: '-0.01rem',
          },
          h3: {
            fontSize: 32,
            lineHeight: '36px',
            fontWeight: 500,
          },
          h4: {
            fontSize: 20,
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '-0.01rem',
          },
          body1: {
            fontSize: 16,
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '0rem',
          },
          body2: {
            color: colors.text.secondary,
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 500,
            letterSpacing: '0rem',
          },
          button: {
            fontSize: '12px',
            lineHeight: '24px',
            fontWeight: 600,
            letterSpacing: '0.08rem',
          },
          caption: {
            color: colors.text.secondary,
            fontSize: 14,
            lineHeight: '20px',
            fontWeight: 400,
          },
          subtitle1: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 600,
            letterSpacing: '0.08rem',
          },
          subtitle2: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '-0.01rem',
          },
        },
        palette: {
          mode,
          primary: colors.primary,
          secondary: colors.secondary,
          importantLink: colors.importantLink,
          info: colors.info,
          success: colors.success,
          error: colors.error,
          warning: colors.warning,
          text: colors.text,
          background: colors.background,
          code: colors.code,
          divider: colors.divider,
          alerts: colors.alerts,
          networkStatus: colors.networkStatus,
          accent: colors.accent,
          grayScale: colors.grayScale,
        },
        spacing,
        zIndex: {
          guide: {
            background: 10000,
            highlight: 10001,
            content: 10002,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: colors.background?.default,
                minWidth: 350,
              },
              a: {
                color: colors.importantLink,
                textDecoration: 'none',
              },
              '#cf-turnstile': {
                width: 'auto !important',
                margin: '0px 0 20px',
                iframe: {
                  width: '100% !important',
                },
              },
              '*': {
                fontVariantLigatures: 'none',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                color: colors.text?.primary,
                backgroundColor: colors.background?.default,
                boxShadow: 'none',
                borderStyle: 'solid',
                borderWidth: '0px 0px 1px 0px',
                borderColor: colors.divider,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                transition: 'all 300ms ease-out',
                borderRadius: 360,
                boxShadow: 'none',
                textShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  textShadow: 'none',
                },
                '&:focus': {
                  boxShadow: 'none',
                  textShadow: 'none',
                },
              },

              outlined: {
                color: colors.text.primary,
              },

              outlinedSecondary: {
                borderColor: colors.secondary.main,
              },

              outlinedError: {
                borderColor: colors.error.main,
              },

              // contained: {
              //   boxShadow: 'none',
              //   textShadow: 'none',
              //   '&:hover': {
              //     boxShadow: 'none',
              //     textShadow: 'none',
              //   },
              // },
              // containedPrimary: {
              //   '&.Mui-disabled': {
              //     background: colors.primary,
              //     color: colors.primary,
              //     opacity: 0.5,
              //     '& .MuiCircularProgress-circle': {
              //       stroke: colors.primary.contrastText,
              //     },
              //   },
              // },
              // containedInfo: {
              //   background: alpha(colors.info.main, 0.5),
              //   color: colors.primary.main,

              //   '&:hover': {
              //     background: alpha(colors.info.main, 0.6),
              //     color: colors.primary.main,
              //   },
              // },
              // containedError: {
              //   '&.Mui-disabled': {
              //     background: colors.error.main,
              //     color: colors.error.contrastText,
              //     opacity: 0.5,
              //   },
              // },
            },
            defaultProps: {
              color: 'primary',
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                border: 'none',
                boxShadow: 'none',
                borderRadius: 4,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                padding: 1.5 * spacing,
              },
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                transition: 'all 300ms ease-out',

                '& .MuiSelect-select.MuiSelect-filled': {
                  paddingTop: '10px !important',
                  paddingBottom: '10px !important',
                },

                // '&:hover': {
                //   background: colors.background?.input,
                //   border: `1px solid ${colors.primary}`,
                // },
                // '&.Mui-focused': {
                //   border: `1px solid ${colors.primary.main}`,
                //   background: colors.background.input,
                // },
                '&:before': {
                  display: 'none',
                },
                '&:after': {
                  display: 'none',
                },
                // '&:active': {
                //   borderStyle: 'solid',
                //   borderWidth: '1px',
                //   borderColor: colors.divider,
                // },
                borderRadius: 4,
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: colors.divider,
                backgroundColor: colors.background.paper,
              },
              sizeSmall: {
                '& .MuiSelect-select.MuiSelect-filled': {
                  paddingTop: 6,
                  paddingBottom: 6,
                },
              },

              inputTypeSearch: {},
              input: {
                paddingTop: 10,
                paddingBottom: 10,
                '&:-webkit-autofill': {
                  // backgroundClip: 'text',
                  // fontFamily,
                },
              },
              inputHiddenLabel: {
                paddingTop: `${spacing}px !important`,
                paddingBottom: `${spacing}px !important`,
              },
              multiline: {
                paddingTop: 10,
                paddingBottom: 10,
              },
              inputMultiline: {
                paddingTop: 0,
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              filled: {
                paddingTop: 0,
              },
              icon: {
                // marginRight: 5,
              },
            },
            defaultProps: {
              // IconComponent: KeyboardArrowDownIcon,
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                marginLeft: 0,
                marginRight: 0,
                '&.Mui-error': {
                  // color: colors.error.contrastText,
                },
              },
            },
          },
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                background: colors.background.paper,
                color: colors.text.secondary,
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 400,
                padding: `${spacing * 0.5}px ${spacing}px`,
                boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.20)`,
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: colors.divider,
              },
              arrow: {
                display: 'none',
              },
            },
            defaultProps: {
              enterTouchDelay: 0,
              leaveTouchDelay: 5000,
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '24px',
                height: 24,
              },

              label: {
                margin: 0,
                padding: `0px ${spacing}px`,
              },

              icon: {
                margin: `0px ${-1.5 * spacing}px 0px 0px`,
                padding: `0px ${spacing}px`,
              },
            },
            defaultProps: {
              color: 'primary',
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                boxShadow: 'none',
                background: colors.background.default,
              },
            },
          },
          MuiMenu: {
            styleOverrides: {
              paper: {
                background: colors.background.default,
                border: `1px solid ${colors.divider}`,
                // boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.20)`,
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: colors.divider,
              },
              root: {
                marginTop: spacing,
              },
            },
          },
        },
        // components: {

        //   MuiTabs: {
        //     styleOverrides: {
        //       root: {},
        //       indicator: {
        //         display: 'none',
        //       },
        //     },
        //   },
        //   MuiTab: {
        //     styleOverrides: {
        //       root: {
        //         textTransform: 'none',
        //         background: 'transparent',
        //         borderRadius: 4,
        //         marginRight: spacing * 2,
        //         minWidth: 'auto',
        //         minHeight: 40,
        //         padding: 12,
        //         lineHeight: 1,
        //         transition: 'background-color,color 300ms ease-out',
        //         color: colors.text.secondary,
        //         fontWeight: 400,
        //         '&:hover': {
        //           color: colors.primary.main,
        //         },
        //         '&.selected': {
        //           background: colors.info.light,
        //           color: colors.primary.main,
        //           fontWeight: 500,
        //         },
        //         '&.Mui-disabled': {
        //           opacity: 0.3,
        //         },
        //         '&:before': {
        //           fontWeight: 500,
        //           content: 'attr(data-before)',
        //           visibility: 'hidden',
        //           height: 0,
        //         },
        //       },
        //     },
        //   },

        //   MuiInputLabel: {
        //     styleOverrides: {
        //       root: {
        //         marginBottom: spacing,
        //       },
        //     },
        //   },
        //   MuiFormControl: {},
        //   MuiFilledInput: {
        //     styleOverrides: {
        //       root: {
        //         background: colors.background.input,
        //         border: `1px solid ${colors.background.default}`,
        //         borderRadius: 8,
        //         transition: 'all 300ms ease-out',

        //         '& .MuiSelect-select.MuiSelect-filled': {
        //           paddingTop: 8,
        //           paddingBottom: 8,
        //         },
        //         '& input': {
        //           borderRadius: 8,
        //           // fontSize: '0.875rem',
        //         },

        //         '&:hover': {
        //           background: colors.background.input,
        //           border: `1px solid ${colors.primary.main}`,
        //         },
        //         '&.Mui-focused': {
        //           border: `1px solid ${colors.primary.main}`,
        //           background: colors.background.input,
        //         },
        //         '&:before': {
        //           display: 'none',
        //         },
        //         '&:after': {
        //           display: 'none',
        //         },
        //       },
        //       sizeSmall: {
        //         borderRadius: 4,
        //         '& .MuiSelect-select.MuiSelect-filled': {
        //           paddingTop: 6,
        //           paddingBottom: 6,
        //         },
        //       },

        //       inputTypeSearch: {},
        //       input: {
        //         paddingTop: 22,
        //         '&:before': {
        //           display: 'none',
        //         },
        //         '&:after': {
        //           display: 'none',
        //         },
        //         '&:-webkit-autofill': {
        //           // backgroundClip: 'text',
        //           // fontFamily,
        //         },
        //       },
        //       inputHiddenLabel: {
        //         paddingTop: `${spacing}px !important`,
        //         paddingBottom: `${spacing}px !important`,
        //       },
        //       inputMultiline: {
        //         paddingTop: 0,
        //       },
        //     },
        //   },
        //   MuiInput: {
        //     styleOverrides: {
        //       root: {
        //         '&:before': {
        //           borderWidth: '1px !important',
        //           borderColor: '#1D1D1F !important',
        //         },
        //         '&:after': {
        //           borderWidth: '1px',
        //         },
        //       },
        //     },
        //   },
        //   MuiCheckbox: {
        //     defaultProps: {
        //       checkedIcon: <CheckboxCheckedIcon />,
        //       icon: <CheckboxUncheckedIcon />,
        //       indeterminateIcon: <CheckboxIndeterminateIcon />,
        //     },
        //     styleOverrides: {
        //       root: {
        //         marginRight: 4,
        //       },
        //     },
        //   },
        //   MuiSelect: {
        //     styleOverrides: {
        //       filled: {
        //         paddingTop: 8,
        //       },
        //       icon: {
        //         // marginRight: 5,
        //       },
        //     },
        //     defaultProps: {
        //       IconComponent: KeyboardArrowDownIcon,
        //     },
        //   },
        //   MuiMenu: {
        //     styleOverrides: {
        //       paper: {
        //         border: `1px solid ${colors.divider}`,
        //         boxShadow: '0px 4px 14px rgba(101, 101, 101, 0.21)',
        //       },
        //     },
        //     defaultProps: {
        //       // disableScrollLock: true,
        //       PaperProps: {
        //         sx: {
        //           marginTop: 1,
        //         },
        //       },
        //     },
        //   },
        //   MuiTable: {
        //     styleOverrides: {
        //       root: {},
        //     },
        //   },
        //   MuiAlert: {
        //     styleOverrides: {
        //       filledWarning: {
        //         background: colors.alerts.warning.background,
        //         color: colors.alerts.warning.text,
        //       },
        //       outlinedWarning: {
        //         background: colors.alerts.warning.background,
        //         color: colors.alerts.warning.text,
        //       },
        //       standardWarning: {
        //         background: colors.alerts.warning.background,
        //         color: colors.alerts.warning.text,
        //       },
        //       filledSuccess: {
        //         background: colors.alerts.success.background,
        //         color: colors.alerts.success.text,
        //       },
        //       outlinedSuccess: {
        //         borderColor: colors.alerts.success.background,
        //         color: colors.alerts.success.text,
        //       },
        //       standardSuccess: {
        //         background: colors.alerts.success.background,
        //         color: colors.alerts.success.text,
        //       },
        //       filledError: {
        //         background: colors.alerts.error.background,
        //         color: colors.alerts.error.text,
        //       },
        //       outlinedError: {
        //         background: colors.alerts.error.background,
        //         color: colors.alerts.error.text,
        //       },
        //       standardError: {
        //         background: colors.alerts.error.background,
        //         color: colors.alerts.error.text,
        //       },
        //       filledInfo: {
        //         background: colors.alerts.info.background,
        //         color: colors.alerts.info.text,
        //       },
        //       outlinedInfo: {
        //         borderColor: colors.alerts.info.background,
        //         color: colors.alerts.info.text,

        //         '& svg': {
        //           fill: colors.primary.main,
        //         },
        //       },
        //       standardInfo: {
        //         background: colors.alerts.info.background,
        //         color: colors.alerts.info.text,
        //       },
        //     },
        //   },
        //   MuiLinearProgress: {
        //     styleOverrides: {
        //       root: {
        //         borderRadius: 6,
        //         height: 6,
        //       },
        //     },
        //   },
        //   MuiPopover: {
        //     styleOverrides: {
        //       root: {},
        //     },
        //   },
        //   MuiTooltip: {
        //     styleOverrides: {
        //       tooltip: {
        //         background: colors.background.paper,
        //         color: colors.text.secondary,
        //         fontSize: '0.875rem',
        //         fontWeight: 400,
        //         lineHeight: 1.6,
        //         maxWidth: 400,
        //         padding: `${spacing * 1.5}px ${spacing * 2.5}px`,
        //         boxShadow: `0px 2px 12px rgba(101, 101, 101, 0.21)`,
        //         border: `1px solid ${alpha(colors.text.primary, 0.2)}`,
        //       },
        //       arrow: {
        //         '&:before': {
        //           background: colors.background.paper,
        //           position: 'absolute',
        //           zIndex: 2,
        //         },
        //         '&:after': {
        //           content: '""',
        //           margin: 'auto',
        //           display: 'block',
        //           width: '100%',
        //           height: '100%',
        //           background: alpha(colors.text.primary, 0.2),
        //           position: 'absolute',
        //           top: 1,
        //           transformOrigin: '100% 0',
        //           transform: 'rotate(45deg)',
        //           zIndex: 1,
        //         },
        //       },
        //     },
        //   },
        // },
      }),
    [colors, mode],
  );
};
