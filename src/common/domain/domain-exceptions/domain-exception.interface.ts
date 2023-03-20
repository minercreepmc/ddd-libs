export interface DomainException extends Error {
  readonly message: string;
  readonly code: string;
}
