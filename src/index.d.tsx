declare module 'use-element-position' {
  import { MutableRefObject } from 'react';

  export function useElementPosition<T = HTMLElement>(initial: {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  }): [MutableRefObject<T>, { left: number; top: number; width: number; height: number }];
}
