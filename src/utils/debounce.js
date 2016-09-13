/* eslint-disable prefer-rest-params */

export function debounce(fn, wait) {
  let timeout;
  return function internalDebounce() {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), (wait || 1));
  };
}
