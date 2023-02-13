import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from 'ts-common-exceptions';

export class GuardUtils {
  static isEmptyOrThrow(value: any): void {
    this.notNullOrUndefinedOrThrow(value);
    this.notEmptyStringOrThrow(value);
    this.notArrayEmptyOrThrow(value);
  }

  static isEmpty(value: any): boolean {
    return (
      this.isNullOrUndefined(value) &&
      this.isEmptyString(value) &&
      this.isEmptyArray(value) &&
      this.isArrayContainEmpty(value)
    );
  }

  static notNullOrUndefinedOrThrow(value: any): void {
    if (this.isNullOrUndefined(value)) {
      throw new ArgumentNotProvidedException(
        'Argument cannot null or undefined'
      );
    }
  }

  static isNullOrUndefined(value: any): boolean {
    return typeof value === undefined || typeof value === null;
  }

  static notArrayEmptyOrThrow(value: any): void {
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

  static isEmptyArray(value: any): value is Array<any> {
    return typeof value === 'object' && value.length === 0;
  }

  static isArrayContainEmpty(arr: Array<any>): boolean {
    return arr.every((item) => this.isNullOrUndefined(item));
  }

  static notEmptyStringOrThrow(value: any): void {
    if (this.isEmptyString(value)) {
      throw new ArgumentInvalidException('String cannot empty');
    }
  }

  static isEmptyString(value: any): boolean {
    return typeof value === 'string' && value === '';
  }
}
