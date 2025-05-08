import { relativeDateFormat } from '@i18n';

import { useTicker } from './useTicker';
import { useState } from 'react';

export function useCountdown({ timestamp }: { timestamp?: Date | string | number | undefined }) {
  const [timeLeft, setTimeLeft] = useState<string | undefined>(
    relativeDateFormat(new Date(), timestamp),
  );

  useTicker(() => setTimeLeft(relativeDateFormat(new Date(), timestamp)), 1000);

  return timeLeft;
}
