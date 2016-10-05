// @flow
export function debounce(fn: () => void, wait: number = 0) {
  let timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
