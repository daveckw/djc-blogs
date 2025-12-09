export function arrayIsEmpty(array: unknown[]) {
  if (Array.isArray(array)) {
    if (array.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}
