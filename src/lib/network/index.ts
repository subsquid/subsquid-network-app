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
  if (td.isZero()) return 0;

  const cd = BigNumber(capedDelegation);
  if (cd.isZero()) return 0;

  const ratio = new BigNumber(1).minus(cd.div(td));
  return ratio.lt(0) ? 0 : ratio.times(100).toNumber();
}
