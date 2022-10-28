export interface Decorator<T> {
  decorate(wrappee: T): T;
}
