import { ValidationException } from '@domain/domain-exceptions';

export class ValidationResponse {
  isValid: boolean;
  exceptions: ValidationException[];

  constructor(isValid: boolean, exceptions: ValidationException[]) {
    this.isValid = isValid;
    this.exceptions = exceptions;
  }

  static success(): ValidationResponse {
    return new ValidationResponse(true, []);
  }

  static fail(exceptions: ValidationException[]): ValidationResponse {
    return new ValidationResponse(false, exceptions);
  }
}
