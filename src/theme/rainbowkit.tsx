import { useMemo } from 'react';

import { lightTheme, Theme } from '@rainbow-me/rainbowkit';
import { merge } from 'lodash-es';

import { PaletteType, useCreateTheme } from './theme';

export const useCreateRainbowKitTheme = (mode: PaletteType) => {
  const { palette, typography } = useCreateTheme(mode);

  return useMemo((): Theme => {
    return merge(lightTheme(), {
      blurs: {
        modalOverlay: 'blur(5px)',
      },
      // colors: {
      //   accentColor: palette.accent.contrastText,
      //   accentColorForeground: palette.accent.main,
      //   actionButtonBorder: 'transparent',
      //   actionButtonBorderMobile: 'transparent',
      //   actionButtonSecondaryBackground: palette.accent.main,
      //   closeButton: palette.text.secondary,
      //   closeButtonBackground: 'transparent',
      //   error: palette.error.main,
      //   generalBorder: palette.divider,
      //   menuItemBackground: palette.action.hover,
      //   modalBackdrop: 'rgba(166, 166, 166, 0.6)',
      //   modalBackground: palette.background.paper,
      //   modalBorder: palette.divider,
      //   modalText: palette.text.primary,
      //   modalTextSecondary: palette.text.secondary,
      //   profileActionHover: palette.action.hover,
      //   profileForeground: palette.background.content,
      //   selectedOptionBorder: 'transparent',
      // },
      fonts: {
        body: typography.fontFamily,
      },
      radii: {
        modal: '8px',
        modalMobile: '8px',
        actionButton: '4px',
      },
      shadows: {
        dialog: 'none',
      },
    } satisfies DeepPartial<Theme>);
  }, [palette, typography]);
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
