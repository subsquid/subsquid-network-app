import BigNumber from 'bignumber.js';
import { trimEnd } from 'lodash-es';
import prettyBytes from 'pretty-bytes';
import { zeroAddress } from 'viem';
import { getAddress } from 'viem/utils';

export function percentFormatter(value?: number | string | BigNumber) {
  if (!value) return '0%';

  value = BigNumber(value);

  return `${value.lt(0.01) && value.gt(0) ? '<0.01' : value.toFixed(2)}%`;
}

const formatter8 = new Intl.NumberFormat('en', {
  maximumFractionDigits: 8,
});

export function numberWithCommasFormatter(val?: number | string) {
  if (val === undefined) return '';

  return formatter8.format(Number(val));
}

export function bytesFormatter(val?: number | string) {
  if (!val) return '0 MB';

  return prettyBytes(Number(val), { maximumFractionDigits: 0 });
}

export function addressFormatter(val?: string, compact?: boolean) {
  val = val || zeroAddress;

  const address = getAddress(val);
  return compact ? `${address.substring(0, 6)}...${address?.slice(-4)}` : address;
}

export function urlFormatter(val: string) {
  val = val.trim().toLowerCase();
  return val.startsWith('http://') || val.startsWith('https://')
    ? val
    : val.replace(/^(?!(?:\w+?:)?\/\/)/, 'https://');
}

export function tokenFormatter(val: number | BigNumber, currency: string, decimals?: number) {
  const bn = BigNumber(val);
  return (
    trimEnd(
      trimEnd(
        bn.toFormat(decimals ?? 6, BigNumber.ROUND_FLOOR, {
          decimalSeparator: '.',
          groupSeparator: ',',
          groupSize: 3,
        }),
        '0',
      ),
      '.',
    ) + ` ${currency}`
  );
}
