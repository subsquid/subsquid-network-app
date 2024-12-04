import { relativeDateFormat } from '@i18n';

import { useTicker } from './useTicker';

export function useCountdown({ timestamp }: { timestamp?: Date | string | number | undefined }) {
  const curTimestamp = useTicker(() => Date.now(), 1000);
  const timeLeft = timestamp ? relativeDateFormat(curTimestamp, timestamp) : undefined;

  return timeLeft;
}
