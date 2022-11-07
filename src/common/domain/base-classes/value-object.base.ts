import { Guard } from '@utils/guard';

type Primitive = string | boolean | number;

export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}

export abstract class ValueObject<T> implements Guard<void> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;
    this.guard();
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    return JSON.stringify(vo) === JSON.stringify(this);
  }

  public unpack() {
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
