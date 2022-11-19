import { AbstractSpecificaton } from './specification.abstract';
import { ISpecificaton } from './specification.interface';

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
