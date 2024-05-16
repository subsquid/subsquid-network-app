import prettyBytes from 'pretty-bytes';
import { zeroAddress } from 'viem';
import { getAddress } from 'viem/utils';

export function percentFormatter(value?: number | string) {
  if (!value) return '0%';

  return `${Number(value).toFixed(2)}%`;
}

const formatter8 = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 8,
});

export function numberWithSpacesFormatter(val?: number | string) {
  if (val === undefined) return '';

  return formatter8.format(Number(val)).replace(',', '.');
}

export function bytesFormatter(val?: number | string) {
  if (!val) return '0 GB';

  return prettyBytes(Number(val), { maximumFractionDigits: 0 });
}

export function addressFormatter(val?: string, shortify?: boolean) {
  val = val || zeroAddress;

  const address = getAddress(val);
  return shortify ? `${address.substring(0, 6)}...${address?.slice(-4)}` : address;
}
