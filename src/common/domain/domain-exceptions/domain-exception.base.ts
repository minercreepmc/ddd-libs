export abstract class DomainExceptionBase extends Error {
  readonly message: string;
  readonly code: string;
}
