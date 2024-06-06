import BigNumber from 'bignumber.js';

export * from './utils';

export function calculateDelegationCapacity({
  totalDelegation,
  capedDelegation,
}: {
  capedDelegation: string;
  totalDelegation: string;
}) {
  const td = BigNumber(totalDelegation);
  if (td.isZero()) return 100;

  const cd = BigNumber(capedDelegation);
  if (cd.isZero()) return Infinity;

  const ratio = cd.div(td);
  return ratio.gt(1) ? 100 : ratio.times(100).toNumber();
}
