import { AbstractConstructor } from "@types";

export function IsArrayContainInstanceOf<T>(
  array: T[],
  className: AbstractConstructor<T>
): boolean {
  return array.some((element) => element instanceof className);
}
