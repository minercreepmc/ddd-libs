export function IsArrayContainInstanceOf<T>(
  array: T[],
  className: new (...args: any) => T
): boolean {
  return array.some((element) => element instanceof className);
}
