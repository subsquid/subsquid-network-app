import prettyBytes from 'pretty-bytes';

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
