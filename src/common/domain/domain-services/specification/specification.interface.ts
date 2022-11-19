export interface ISpecificaton<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: ISpecificaton<T>): ISpecificaton<T>;
  or(other: ISpecificaton<T>): ISpecificaton<T>;
  not(): ISpecificaton<T>;
}
