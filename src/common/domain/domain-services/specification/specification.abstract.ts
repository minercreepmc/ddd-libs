import { AndSpecification } from './and-specification';
import { NotSpecification } from './not-specification';
import { OrSpecification } from './or-specification';
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
