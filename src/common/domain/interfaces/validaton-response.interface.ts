import { ValidationExceptionBase } from '@domain/domain-exceptions';

export class ValidationResponse {
  constructor(
    public isValid: boolean,
    public exceptions: ValidationExceptionBase[],
    public value?: any
  ) {}

  static success(value?: any): ValidationResponse {
    return new ValidationResponse(true, [], value);
  }

  static fail(exceptions: ValidationExceptionBase[]): ValidationResponse {
    return new ValidationResponse(false, exceptions);
  }
}
