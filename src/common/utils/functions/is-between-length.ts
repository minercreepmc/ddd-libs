export function isStringBetweenLength(
  value: string,
  min: number,
  max: number
): boolean {
  return min <= value.length && value.length <= max;
}
