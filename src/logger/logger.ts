export function debug(message: string) {
  return console.log(`%c${message}`, '');
}
export function info(message: string) {
  return console.log(`%c${message}`, 'color: #66B2FF; font-size: 16px');
}
export function error(message: Error | string | unknown) {
  return console.error(`%c${message}`, 'color: red; font-size: 16px');
}
export const logger = {
  debug,
  info,
  error,
};
