import { ArgumentInvalidException } from 'ts-common-exceptions';

/**
 * Class that provides utility methods to validate arguments and throw exceptions in case of invalid input
 */
export class GuardUtils {
  /**
   * Checks if the provided value is either null or undefined
   * @param value The value to check
   * @returns `true` if the value is either null or undefined, `false` otherwise
   */
  static isNullOrUndefined(value: unknown): boolean {
    return typeof value === 'undefined' || value === null;
  }

  static isFalsy(value: unknown): boolean {
    return (
      value === false ||
      value === 0 ||
      value === '' ||
      value === null ||
      value === undefined
    );
  }

  /**
   * Checks if an object is empty.
   * @param value The object to check.
   * @returns True if the object has no properties, false otherwise.
   */
  static isEmptyObject(value: unknown): boolean {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    );
  }

  static isObjectContainNull<T extends { [key: string]: unknown }>(
    value: T
  ): boolean {
    return Object.keys(value).some(
      (key) => value[key] === undefined || value[key] === null
    );
  }

  /**
   * Determines if a value is an empty array.
   * @param value - The value to check.
   * @returns True if the value is an empty array, false otherwise.
   */
  static isEmptyArray(value: unknown): value is Array<any> {
    return Array.isArray(value) && value.length === 0;
  }

  /**
   * Determines if an array contains unknown empty elements.
   * @param arr - The array to check.
   * @returns True if the array contains empty elements, false otherwise.
   */
  static isArrayContainNull(arr: Array<unknown>): boolean {
    if (arr.length === 0) {
      return false;
    }
    return arr.every((item) => this.isNullOrUndefined(item));
  }

  /**
   * Determines if a value is an empty string.
   * @param value - The value to check.
   * @returns True if the value is an empty string, false otherwise.
   */
  static isEmptyString(value: unknown): boolean {
    return typeof value === 'string' && value === '';
  }
}
