export interface ISpecificaton<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: ISpecificaton<T>): ISpecificaton<T>;
  or(other: ISpecificaton<T>): ISpecificaton<T>;
  not(): ISpecificaton<T>;
}

export interface IAsyncSpecification<T> {
  isSatisfiedBy(candidate: T): Promise<boolean>;
  and(other: IAsyncSpecification<T>): IAsyncSpecification<T>;
  or(other: IAsyncSpecification<T>): IAsyncSpecification<T>;
  not(): IAsyncSpecification<T>;
}
