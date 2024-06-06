import BigNumber from 'bignumber.js';
import bs58 from 'bs58';
import { toHex } from 'viem';

import { SQD_DECIMALS } from '../../api/contracts/consts';

export function fromSqd(value?: string | number | bigint | BigNumber): BigNumber {
  if (!value) return BigNumber('0');

  value = BigNumber(typeof value === 'bigint' ? value.toString() : value);
  return value.shiftedBy(-SQD_DECIMALS);
}

export function toSqd(value?: string | number | BigNumber): string {
  if (!value) return '0';

  value = BigNumber(value);
  if (value.isNaN()) return '0';

  return value.shiftedBy(SQD_DECIMALS).toFixed();
}

// export function humanReadableSqd(value?: string | number | BigNumber) {
//   if (!value) return '0';

//   const v = BigNumber(String(value)).div(10 ** SQD_DECIMALS).toFixed(18);

//   return trimEnd(trimEnd(v, '0'), '.');
// }

// export function formatSqd(
//   SQD_TOKEN: string,
//   value: string | BigNumber | number | undefined,
//   decimals: number = 0,
// ) {
//   if (!value) return `0 ${SQD_TOKEN}`;

//   value = typeof value === 'string' ? fromSqd(value) : value;

//   const n = Number(value);
//   if (n > 0 && n < 0.1 ** decimals) {
//     return `<0.01 ${SQD_TOKEN}`;
//   }

//   return `${numberWithSpacesFormatter(value.toFixed(decimals))} ${SQD_TOKEN}`;
// }

export function peerIdToHex(peerId: string) {
  return toHex(bs58.decode(peerId));
}
