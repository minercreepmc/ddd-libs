import { ValidationException } from "@domain/domain-exceptions";

export interface ValidationResponse {
  isValid: boolean;
  exceptions: ValidationException[];
}
