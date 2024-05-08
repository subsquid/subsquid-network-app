import { numberWithSpacesFormatter } from '@lib/formatters/formatters.ts';
import { WriteContractResult } from '@wagmi/core';
import bs58 from 'bs58';
import Decimal from 'decimal.js';
import trimEnd from 'lodash-es/trimEnd';
import { BaseError as BaseViemError, formatUnits, parseUnits, toHex } from 'viem';

import { useContracts } from '@network/useContracts';

import { SQD_DECIMALS } from './consts';

export type TxResult = { tx: WriteContractResult; error?: never } | { error: string; tx?: never };

export type WriteContractRes =
  | { success: true; failedReason?: never }
  | { success: false; failedReason: string };

const KNOWN_ERRORS: Record<string, string> = {
  '0xe450d38c': 'Insufficient balance',
};

export function errorMessage(e: unknown) {
  if (e instanceof BaseViemError) {
    const message = e.shortMessage.split('\n').pop();

    if (message) {
      if (KNOWN_ERRORS[message]) return KNOWN_ERRORS[message];
      else if (message.startsWith('0x') && e.metaMessages) return e.metaMessages?.join('\n');

      return message;
    }

    return e.message;
  }

  return e instanceof Error ? e.message : e?.toString() || 'unknown error';
}

export function toSqd(value?: string | bigint | number) {
  if (!value) return 0n;

  return parseUnits(value.toString(), SQD_DECIMALS);
}

export function fromSqd(value?: string | bigint | number) {
  if (!value) return new Decimal(0);

  return new Decimal(formatUnits(BigInt(value), SQD_DECIMALS));
}

export function humanReadableSqd(value?: string | bigint | number) {
  if (!value) return '0';

  const v = new Decimal(String(value)).div(10 ** SQD_DECIMALS).toFixed(18);

  return trimEnd(trimEnd(v, '0'), '.');
}

export function formatSqd(
  SQD_TOKEN: string,
  value: string | Decimal | number | undefined,
  decimals?: number,
) {
  if (!value) return `0 ${SQD_TOKEN}`;

  value = typeof value === 'string' ? fromSqd(value) : value;

  const n = Number(value);
  if (n > 0 && n < 0.01) {
    return `<0.01 ${SQD_TOKEN}`;
  }

  return `${numberWithSpacesFormatter(value.toFixed(decimals))} ${SQD_TOKEN}`;
}

export function isApproveRequiredError(error: unknown) {
  if (typeof error !== 'string') return;

  const message = error.toLowerCase();

  return (
    message.includes('insufficient allowance') || //  openzeppelin old version
    message.includes('0xfb8f41b2') // openzeppelin new version
  );
}

export function peerIdToHex(peerId: string) {
  return toHex(bs58.decode(peerId));
}
