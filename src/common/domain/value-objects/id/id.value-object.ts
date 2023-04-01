import { ValidationResponse } from '@domain/interfaces';
import { TextValueObject, TextValueObjectOptions } from '../primitive';

export class ID extends TextValueObject {
  private static readonly OPTIONS: TextValueObjectOptions = {
    minLength: 1,
    maxLength: 300,
    allowEmpty: false,
    allowNumber: true,
    allowSymbols: true,
    allowLowercase: true,
    allowUppercase: true,
    allowWhitespace: false,
  };

  constructor(value: string) {
    super(value, ID.OPTIONS);
  }

  static validate(value: string): ValidationResponse {
    return super.validate(value, ID.OPTIONS);
  }
}
