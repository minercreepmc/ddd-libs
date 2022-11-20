import { IValueObject } from './value-object.interface';

type Primitive = string | boolean | number;
export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}
type ValueObjectProps<T> = T extends Primitive | Date ? DomainPrimitive<T> : T;

export abstract class AbstractValueObject<T> implements IValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  protected constructor(props: ValueObjectProps<T>) {
    this.props = props;
    this.guard();
  }

  public equals(vo?: AbstractValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    return JSON.stringify(vo) === JSON.stringify(this);
  }

  public unpack(): T {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }
  }

  private isDomainPrimitive(
    obj: unknown
  ): obj is DomainPrimitive<T & (Primitive | Date)> {
    if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
      return true;
    }
    return false;
  }

  public abstract guard(): void;
}
