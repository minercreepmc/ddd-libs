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

export class ValidationException extends Error {}

export class InvalidOperationException extends Error {}
