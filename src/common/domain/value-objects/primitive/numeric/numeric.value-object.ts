import {
  ArgumentContainsFloatException,
  ArgumentContainsIntegerException,
  ArgumentContainsNegativeException,
  ArgumentContainsPositiveException,
  ArgumentContainsZeroException,
  ArgumentNotANumberException,
  ArgumentOutofBoundsException,
  MultipleExceptions,
  ValidationException,
} from '@domain/domain-exceptions';
import { ValidationResponse } from '@domain/interfaces';
import { AbstractValueObject } from '@domain/value-objects/value-object.abstract';
import { NumericOptionIsNotValid } from './numeric.exception';
import {
  IsAllowedZeroOptions,
  IsAllowNegativeOptions,
  IsAllowPositiveOptions,
  NumericValueObjectOptions,
} from './numeric.interface';

export class NumericValueObject<
  T extends NumericValueObject<T>
> extends AbstractValueObject<number> {
  constructor(value: number, options = NumericValueObject.DEFAULT_OPTIONS) {
    const opts = Object.assign({}, NumericValueObject.DEFAULT_OPTIONS, options);
    if (!NumericValueObject.isValidOptions(opts)) {
      throw new NumericOptionIsNotValid('Numeric options it not valid');
    }

    const { isValid, exceptions: errors } = NumericValueObject.validate(
      value,
      opts
    );

    if (!isValid) {
      throw new MultipleExceptions(errors);
    }

    super({ value });
    this.options = opts;
  }

  private readonly options: NumericValueObjectOptions;

  getOptions(): NumericValueObjectOptions {
    return this.options;
  }

  getValue(): number {
    return this.details.value;
  }

  add(other: T): T {
    return new (<any>this.constructor)(
      this.getValue() + other.getValue(),
      this.options
    );
  }

  subtract(other: T): T {
    return new (<any>this.constructor)(
      this.getValue() - other.getValue(),
      this.options
    );
  }

  isLessThan(other: T): boolean {
    return this.getValue() < other.getValue();
  }

  isGreaterThan(other: T): boolean {
    return this.getValue() > other.getValue();
  }

  isEqualTo(other: T): boolean {
    return this.getValue() === other.getValue();
  }

  isLessThanOrEqualTo(other: T): boolean {
    return this.getValue() <= other.getValue();
  }

  isGreaterThanOrEqualTo(other: T): boolean {
    return this.getValue() >= other.getValue();
  }

  static readonly DEFAULT_OPTIONS: NumericValueObjectOptions = {
    containsNegative: true,
    containsPositive: true,
    containsZero: true,
    containsInteger: true,
    containsFloat: true,
    minValue: Number.MIN_SAFE_INTEGER,
    maxValue: Number.MAX_SAFE_INTEGER,
  };

  static validate(
    candidate: unknown,
    options: NumericValueObjectOptions
  ): ValidationResponse {
    const exceptions: ValidationException[] = [];
    if (typeof candidate !== 'number') {
      exceptions.push(new ArgumentNotANumberException());
    }

    const value = candidate as number;

    const {
      minValue,
      maxValue,
      containsZero,
      containsPositive,
      containsNegative,
      containsInteger,
      containsFloat,
    } = options;

    if (
      containsInteger &&
      !containsFloat &&
      !NumericValueObject.isInteger(value)
    ) {
      exceptions.push(new ArgumentContainsFloatException());
    }

    if (
      containsFloat &&
      !containsInteger &&
      !NumericValueObject.isFloat(value)
    ) {
      exceptions.push(new ArgumentContainsIntegerException());
    }

    if (!NumericValueObject.isWithinBounds(value, minValue, maxValue)) {
      exceptions.push(new ArgumentOutofBoundsException());
    }

    if (!NumericValueObject.isAllowPositive(value, { containsPositive })) {
      exceptions.push(new ArgumentContainsPositiveException());
    }

    if (!NumericValueObject.isAllowNegative(value, { containsNegative })) {
      exceptions.push(new ArgumentContainsNegativeException());
    }

    if (!NumericValueObject.isAllowedZero(value, { containsZero })) {
      exceptions.push(new ArgumentContainsZeroException());
    }

    if (exceptions.length === 0) {
      return ValidationResponse.success();
    } else {
      return ValidationResponse.fail(exceptions);
    }
  }

  static isInteger(value: number): boolean {
    return Number.isInteger(value);
  }

  static isFloat(value: number): boolean {
    return Number.isFinite(value) && value % 1 !== 0;
  }

  static isWithinBounds(
    value: number,
    minValue: number | undefined,
    maxValue: number | undefined
  ): boolean {
    return (
      (minValue == null || value >= minValue) &&
      (maxValue == null || value <= maxValue)
    );
  }

  static isPositive(value: number): boolean {
    return value > 0;
  }

  static isAllowPositive(
    value: number,
    options: IsAllowPositiveOptions
  ): boolean {
    const { containsPositive } = options;
    return containsPositive || !NumericValueObject.isPositive(value);
  }

  static isNegative(value: number): boolean {
    return value < 0;
  }

  static isAllowNegative(value: number, options: IsAllowNegativeOptions) {
    const { containsNegative } = options;
    return containsNegative || !NumericValueObject.isNegative(value);
  }

  static isAllowedZero(value: number, options: IsAllowedZeroOptions): boolean {
    const { containsZero } = options;
    return containsZero || value !== 0;
  }

  static isValidOptions(
    candidate: unknown
  ): candidate is NumericValueObjectOptions {
    if (typeof candidate !== 'object' || candidate === null) {
      return false;
    }

    const options = candidate as NumericValueObjectOptions;
    const {
      containsZero,
      containsInteger,
      containsFloat,
      containsNegative,
      containsPositive,
      maxValue,
      minValue,
    } = options;

    if (
      typeof containsZero !== 'boolean' ||
      typeof containsInteger !== 'boolean' ||
      typeof containsFloat !== 'boolean' ||
      typeof containsNegative !== 'boolean' ||
      typeof containsPositive !== 'boolean' ||
      (maxValue && typeof maxValue !== 'number') ||
      (minValue && typeof minValue !== 'number')
    ) {
      return false;
    }

    return true;
  }
}
