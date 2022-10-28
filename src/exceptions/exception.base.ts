import { Exception, SerializedExeption } from './exception.interface';

export abstract class BaseException extends Error implements Exception {
  abstract readonly code: string;

  static isException(candidate: unknown): candidate is Exception {
    return candidate instanceof BaseException;
  }
  toJSON(): SerializedExeption {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      metadata: this.metadata,
    };
  }

  constructor(readonly message: string, readonly metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
