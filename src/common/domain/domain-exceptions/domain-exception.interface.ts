export interface DomainError extends Error {
  readonly message: string;
  readonly code: string;
}
