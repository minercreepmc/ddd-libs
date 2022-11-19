import { AbstractSpecificaton } from './specification.abstract';
import { ISpecificaton } from './specification.interface';

export class NotSpecification<T> extends AbstractSpecificaton<T> {
  constructor(private readonly specification: ISpecificaton<T>) {
    super();
  }

  override isSatisfiedBy(candidate: T): boolean {
    return !this.specification.isSatisfiedBy(candidate);
  }
}
