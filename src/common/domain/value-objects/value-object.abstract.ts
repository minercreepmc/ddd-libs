import { GuardUtils } from '@utils/guard';
import { ArgumentInvalidException } from 'ts-common-exceptions';

// Type mapping to convert value objects to their primitive types
type Unpacked<T> = T extends AbstractValueObject<infer U>
  ? Unpacked<U>
  : T extends Array<infer V>
  ? Array<Unpacked<V>>
  : T extends Record<string, any>
  ? { [K in keyof T]: Unpacked<T[K]> }
  : T;

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

  static includes(
    valueObjects: AbstractValueObject<any>[],
    values: AbstractValueObject<any>[]
  ): boolean {
    const unpackedIds = valueObjects.map((valueObject) => valueObject.unpack());
    return values.every((value) => unpackedIds.includes(value.unpack()));
  }

  static filter<T extends AbstractValueObject<any>>(
    values: T[],
    filterFn: (value: T) => boolean
  ): T[] {
    const filtered = values.filter(filterFn);
    const unpackedFiltered = filtered.map((v) => v.unpack());
    return unpackedFiltered.map(
      (value) => new (filtered[0].constructor as any)(value)
    );
  }

  private convertValue(value: unknown): unknown {
    if (AbstractValueObject.isValueObject(value)) {
      return value.unpack();
    } else if (Array.isArray(value)) {
      return value.map((item) => this.convertValue(item));
    } else if (typeof value === 'object') {
      return this.convertDetailsToObject(value);
    } else {
      return value;
    }
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
      convertedDetails[key] = this.convertValue(value);
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
