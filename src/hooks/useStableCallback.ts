import { useCallback, useRef } from 'react';

export function useStableCallback<T>(fn: () => T) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return useCallback(() => fnRef.current(), []);
} 