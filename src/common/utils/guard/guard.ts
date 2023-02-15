import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from 'ts-common-exceptions';

/**
 * Class that provides utility methods to validate arguments and throw exceptions in case of invalid input
 */
export class GuardUtils {
  /**
   * Checks if the provided value is either null, undefined, an empty string or an empty array, and throws an exception if it is
   * @param value The value to check
   * @throws {ArgumentNotProvidedException} if the value is null or undefined
   * @throws {ArgumentInvalidException} if the value is an empty string or an empty array, or if an array contains only null or undefined values
   */
  static isEmptyOrThrow(value: unknown): void {
    this.notNullOrUndefinedOrThrow(value);
    this.notEmptyStringOrThrow(value);
    this.notArrayEmptyOrThrow(value);
  }

  /**
   * Determines if a value is considered empty.
   * A value is considered empty if it is null, undefined, an empty string, an empty array, or an array containing empty elements.
   * @param value - The value to check.
   * @returns True if the value is considered empty, false otherwise.
   */
  static isEmpty(value: unknown): boolean {
    return (
      this.isNullOrUndefined(value) ||
      this.isEmptyString(value) ||
      this.isEmptyArray(value) ||
      (this.isEmptyArray(value) && this.isArrayContainEmpty(value))
    );
  }

  /**
   * Checks if the provided value is either null or undefined, and throws an exception if it is
   * @param value The value to check
   * @throws {ArgumentNotProvidedException} if the value is null or undefined
   */
  static notNullOrUndefinedOrThrow(
    value: unknown,
    message = 'Argument cannot null or undefined'
  ): void {
    if (this.isNullOrUndefined(value)) {
      throw new ArgumentNotProvidedException(message);
    }
  }

  /**
   * Checks if the provided value is either null or undefined
   * @param value The value to check
   * @returns `true` if the value is either null or undefined, `false` otherwise
   */
  static isNullOrUndefined(value: unknown): boolean {
    return typeof value === 'undefined' || value === null;
  }

  /**
   * Checks if the provided value is an array and if it is empty or contains only null or undefined values, and throws an exception if it does
   * @param value The value to check
   * @throws {ArgumentInvalidException} if the value is an empty array, or if an array contains only null or undefined values
   */
  static notArrayEmptyOrThrow(value: unknown): void {
    if (Array.isArray(value)) {
      if (this.isEmptyArray(value)) {
        throw new ArgumentInvalidException('Array cannot empty');
      }
      if (this.isArrayContainEmpty(value)) {
        throw new ArgumentInvalidException(
          'Item of array cannot contain null or undefined'
        );
      }
    }
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
  static isArrayContainEmpty(arr: Array<unknown>): boolean {
    return arr.every((item) => this.isNullOrUndefined(item));
  }

  /**
   * Throws an exception if the value is an empty string.
   * @param value - The value to check.
   * @throws ArgumentInvalidException if the value is an empty string.
   */
  static notEmptyStringOrThrow(value: unknown): void {
    if (this.isEmptyString(value)) {
      throw new ArgumentInvalidException('String cannot empty');
    }
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
