import { useEffect, useState } from 'react';

export function useTicker<T>(ticker: () => T, ms: number = 1000) {
  const [tickerValue, setTickerValue] = useState(ticker());

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue(ticker());
    }, ms);
    return () => clearInterval(interval);
  }, [ms, ticker]);

  return tickerValue;
}
