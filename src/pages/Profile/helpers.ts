export const shortenP2p = (p2pAddress: string) => {
  if (p2pAddress.length < 5) {
    return '****';
  }

  return `${p2pAddress.slice(0, 4)}****${p2pAddress.slice(-4)}`;
};

export const formatBytes = (bytes: string | number) => {
  const bytesNumber = Number(bytes);
  if (bytesNumber >= 1e12) {
    return `${Math.round(bytesNumber * 1e-12)} TB`;
  } else if (bytesNumber >= 1e9) {
    return `${Math.round(bytesNumber * 1e-9)} GB`;
  } else {
    return `${Math.round(bytesNumber * 1e-6)} MB`;
  }
};

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
