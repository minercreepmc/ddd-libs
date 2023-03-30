import { ValidationExceptionBase } from '@domain/domain-exceptions';

export class ValidationResponse {
  isValid: boolean;
  exceptions: ValidationExceptionBase[];

  constructor(isValid: boolean, exceptions: ValidationExceptionBase[]) {
    this.isValid = isValid;
    this.exceptions = exceptions;
  }

  static success(): ValidationResponse {
    return new ValidationResponse(true, []);
  }

  static fail(exceptions: ValidationExceptionBase[]): ValidationResponse {
    return new ValidationResponse(false, exceptions);
  }
}
