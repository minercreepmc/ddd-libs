export class MultipleExceptions extends Error {
  constructor(exceptions: Error[]) {
    const message = exceptions
      .map((exception, index) => `${index + 1}. ${exception.constructor.name}`)
      .join('\n');
    super(message);
    this.name = 'MultipleArgumentException';
    this.exceptions = exceptions;
  }

  exceptions: Error[];
}

export abstract class ValidationExceptionBase extends Error {
  readonly name: string;
  code: string;
  message: string;
}

export class InvalidOperationException extends Error {}

export abstract class DomainExceptionBase extends Error {
  readonly message: string;
  readonly code: string;
}
