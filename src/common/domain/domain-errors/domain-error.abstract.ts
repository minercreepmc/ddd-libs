export abstract class DomainError extends Error {
  abstract message: string;
  abstract code: string;
}
