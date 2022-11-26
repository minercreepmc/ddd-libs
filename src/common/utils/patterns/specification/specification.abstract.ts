import { ISpecificaton } from './specification.interface';

export abstract class AbstractSpecificaton<T> implements ISpecificaton<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(other: ISpecificaton<T>): ISpecificaton<T> {
    return new AndSpecification<T>(this, other);
  }

  or(other: ISpecificaton<T>): ISpecificaton<T> {
    return new OrSpecification<T>(this, other);
  }

  not(): ISpecificaton<T> {
    return new NotSpecification<T>(this);
  }
}

export class AndSpecification<T> extends AbstractSpecificaton<T> {
  constructor(
    private readonly one: ISpecificaton<T>,
    private readonly other: ISpecificaton<T>
  ) {
    super();
  }

  override isSatisfiedBy(candidate: T): boolean {
    return (
      this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate)
    );
  }
}

export class OrSpecification<T> extends AbstractSpecificaton<T> {
  constructor(
    private readonly one: ISpecificaton<T>,
    private readonly other: ISpecificaton<T>
  ) {
    super();
  }

  override isSatisfiedBy(candidate: T): boolean {
    return (
      this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate)
    );
  }
}

export class NotSpecification<T> extends AbstractSpecificaton<T> {
  constructor(private readonly specification: ISpecificaton<T>) {
    super();
  }

  override isSatisfiedBy(candidate: T): boolean {
    return !this.specification.isSatisfiedBy(candidate);
  }
}
