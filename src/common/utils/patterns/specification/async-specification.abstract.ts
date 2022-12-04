import { IAsyncSpecification } from './specification.interface';

export abstract class AbstractAsyncSpecification<T>
  implements IAsyncSpecification<T>
{
  abstract isSatisfiedBy(candidate: T): Promise<boolean>;

  and(other: IAsyncSpecification<T>): IAsyncSpecification<T> {
    return new AsyncAndSpecification<T>(this, other);
  }

  or(other: IAsyncSpecification<T>): IAsyncSpecification<T> {
    return new AsyncOrSpecification<T>(this, other);
  }

  not(): IAsyncSpecification<T> {
    return new AsyncNotSpecification<T>(this);
  }
}

export class AsyncAndSpecification<T> extends AbstractAsyncSpecification<T> {
  constructor(
    private readonly one: IAsyncSpecification<T>,
    private readonly other: IAsyncSpecification<T>
  ) {
    super();
  }

  override async isSatisfiedBy(candidate: T): Promise<boolean> {
    return (
      this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate)
    );
  }
}

export class AsyncOrSpecification<T> extends AbstractAsyncSpecification<T> {
  constructor(
    private readonly one: IAsyncSpecification<T>,
    private readonly other: IAsyncSpecification<T>
  ) {
    super();
  }

  override async isSatisfiedBy(candidate: T): Promise<boolean> {
    return (
      this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate)
    );
  }
}

export class AsyncNotSpecification<T> extends AbstractAsyncSpecification<T> {
  constructor(private readonly specification: IAsyncSpecification<T>) {
    super();
  }

  override async isSatisfiedBy(candidate: T): Promise<boolean> {
    return !this.specification.isSatisfiedBy(candidate);
  }
}
