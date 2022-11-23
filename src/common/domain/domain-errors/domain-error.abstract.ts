export abstract class AbstractDomainError extends Error {
  abstract readonly message: string;
  abstract readonly code: string;
}
