import BigNumber from 'bignumber.js';
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

export function numberWithCommasFormatter(val?: number | bigint | string) {
  if (val === undefined) return '';

  return formatter8.format(typeof val === 'string' ? Number(val) : val);
}

export function bytesFormatter(val?: number | string) {
  // if (!val) return '0 MB';

  return prettyBytes(Number(val || 0), { maximumFractionDigits: 0 });
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

const tokenFormatOptions = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
};

export function tokenFormatter(val: number | BigNumber, currency: string, decimals = 3) {
  const bn = BigNumber(val);
  const rounded = bn.decimalPlaces(decimals, BigNumber.ROUND_FLOOR);

  const res =
    rounded.eq(0) && !bn.eq(0)
      ? '< ' + BigNumber(1).shiftedBy(-decimals).toFormat(tokenFormatOptions)
      : rounded.toFormat(tokenFormatOptions);

  return res + ` ${currency}`;
}
