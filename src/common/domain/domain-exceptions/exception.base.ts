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

export class ValidationException extends Error {
  readonly code: string;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export class InvalidOperationException extends Error {}
