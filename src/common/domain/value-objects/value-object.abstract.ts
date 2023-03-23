import { GuardUtils } from '@utils/guard';
import { ArgumentInvalidException } from 'ts-common-exceptions';

// Type mapping to convert value objects to their primitive types
type Unpacked<T> = {
  [K in keyof T]: T[K] extends AbstractValueObject<infer U>
    ? U
    : T[K] extends Array<AbstractValueObject<infer V>>
    ? Array<V>
    : T[K];
};

/**
 * Represents a primitive value in the domain model.
 */
type Primitive = string | boolean | number;

/**
 * Represents a domain primitive value, which is a value that is guaranteed to be valid in the domain.
 * @typeparam T The type of the domain primitive value.
 */
export interface DomainPrimitive<T extends Primitive | Date> {
  /**
   * The value of the domain primitive.
   */
  value: T;
}

/**
 * Represents the details of a value object.
 * @typeparam T The type of the value object.
 */
type ValueObjectDetails<T> = T extends Primitive | Date
  ? DomainPrimitive<T>
  : T;

/**
 * Represents an abstract value object.
 * @typeparam T The type of the value object.
 */
export abstract class AbstractValueObject<T> {
  /**
   * Creates a new instance of the AbstractValueObject class.
   * @param details The details of the value object.
   * @throws ArgumentInvalidException if the details are empty.
   */
  protected constructor(readonly details: ValueObjectDetails<T>) {
    AbstractValueObject.isValidOrThrow(details);
    this.details = details;
  }

  /**
   * Checks if the given candidate is valid, throwing an ArgumentInvalidException if it is empty.
   *
   * @param candidate - The candidate to validate.
   * @throws ArgumentInvalidException if the candidate is empty.
   */
  static isValidOrThrow(candidate: unknown) {
    if (
      GuardUtils.isNullOrUndefined(candidate) ||
      GuardUtils.isEmptyObject(candidate) ||
      (Array.isArray(candidate) && GuardUtils.isArrayContainNull(candidate))
    ) {
      throw new ArgumentInvalidException('Value object cannot be empty');
    }
  }

  /**
   * Determines whether this value object is equal to another value object.
   * @param vo The value object to compare to this value object.
   * @returns true if the value objects are equal; otherwise, false.
   */
  equals(vo?: AbstractValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    return JSON.stringify(vo) === JSON.stringify(this);
  }

  /**
   * Unpacks the value object into its underlying value.
   * @returns The underlying value of the value object.
   */
  unpack(): Unpacked<T> {
    if (this.isDomainPrimitive(this.details)) {
      return this.details.value as Unpacked<T>;
    }

    const detailsCopy = this.convertDetailsToObject(this.details);
    return Object.freeze(detailsCopy) as Unpacked<T>;
  }

  /**
   * Converts the given details to a plain object, recursively unpacking any nested value objects.
   *
   * @param details - The details to convert.
   * @returns A plain object representing the given details, with any nested value objects unpacked.
   */
  private convertDetailsToObject(details: any): T {
    const convertedDetails = { ...details };

    for (const [key, value] of Object.entries(convertedDetails)) {
      if (Array.isArray(value)) {
        convertedDetails[key] = (value as Array<unknown>).map((item) => {
          if (AbstractValueObject.isValueObject(item)) {
            return item.unpack();
          } else if (typeof item === 'object') {
            return this.convertDetailsToObject(item);
          } else {
            return item;
          }
        });
      } else if (AbstractValueObject.isValueObject(value)) {
        convertedDetails[key] = value.unpack();
      }
    }

    return convertedDetails;
  }

  /**
   * Determines whether an object is a value object.
   * @param value The object to check.
   * @returns true if the object is a value object; otherwise, false.
   */
  static isValueObject(value: unknown): value is AbstractValueObject<unknown> {
    return value instanceof AbstractValueObject;
  }

  /**
   * Determines whether an object is a domain primitive.
   * @param obj The object to check.
   * @returns true if the object is a domain primitive; otherwise, false.
   */
  private isDomainPrimitive(
    obj: unknown
  ): obj is DomainPrimitive<T & (Primitive | Date)> {
    if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
      return true;
    }
    return false;
  }
}
