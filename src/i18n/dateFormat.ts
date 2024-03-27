import { format, isValid } from 'date-fns';

export function dateFormat(
  value: Date | string | number | undefined,
  tpl: 'dateTime' | 'date' | string = 'date',
) {
  if (!value) return null;

  if (tpl === 'dateTime') {
    tpl = 'dd.MM.yyyy HH:mm:ss';
  } else if (tpl === 'date') {
    tpl = 'dd.MM.yyyy';
  }

  if (value.valueOf() === 0) return null;

  const date = new Date(value);
  if (!isValid(date)) return null;

  return format(new Date(value), tpl);
}
