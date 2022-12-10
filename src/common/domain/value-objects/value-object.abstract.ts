import { convertPropsToObject } from '@utils/functions';
import { IValueObject } from './value-object.interface';

type Primitive = string | boolean | number;
export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}
type ValueObjectDetails<T> = T extends Primitive | Date
  ? DomainPrimitive<T>
  : T;

export abstract class AbstractValueObject<T> implements IValueObject<T> {
  protected constructor(protected readonly details: ValueObjectDetails<T>) {}
  equals(vo?: AbstractValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    return JSON.stringify(vo) === JSON.stringify(this);
  }

  unpack(): T {
    if (this.isDomainPrimitive(this.details)) {
      return this.details.value;
    }

    const detailsCopy = convertPropsToObject(this.details);
    return Object.freeze(detailsCopy);
  }

  static isValueObject(obj: unknown): obj is AbstractValueObject<unknown> {
    return obj instanceof AbstractValueObject;
  }

  private isDomainPrimitive(
    obj: unknown
  ): obj is DomainPrimitive<T & (Primitive | Date)> {
    if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
      return true;
    }
    return false;
  }
}
