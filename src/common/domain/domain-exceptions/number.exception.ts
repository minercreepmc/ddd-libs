import { ValidationException } from './exception.base';

export enum NumberExceptionCodes {
  containsFloat = 'NUMBER.EXCEPTION.CONTAINS_FLOAT',
  containsInteger = 'NUMBER.EXCEPTION.CONTAINS_INTEGER',
  outofBounds = 'NUMBER.EXCEPTION.OUT_OF_BOUNDS',
  containsPositive = 'NUMBER.EXCEPTION.CONTAINS_POSITIVE',
  containsNegative = 'NUMBER.EXCEPTION.CONTAINS_NEGATIVE',
  containsZero = 'NUMBER.EXCEPTION.CONTAINS_ZERO',
}

export class ArgumentContainsFloatException extends ValidationException {
  constructor(message = 'Argument contains float') {
    super(message, NumberExceptionCodes.containsFloat);
  }
}

export class ArgumentContainsIntegerException extends ValidationException {
  constructor(message = 'Argument contains integer') {
    super(message, NumberExceptionCodes.containsInteger);
  }
}

export class ArgumentOutofBoundsException extends ValidationException {
  constructor(message = 'Argument out of bounds') {
    super(message, NumberExceptionCodes.outofBounds);
  }
}

export class ArgumentContainsPositiveException extends ValidationException {
  constructor(message = 'Argument contains positive') {
    super(message, NumberExceptionCodes.containsPositive);
  }
}

export class ArgumentContainsNegativeException extends ValidationException {
  constructor(message = 'Argument contains negative') {
    super(message, NumberExceptionCodes.containsNegative);
  }
}

export class ArgumentContainsZeroException extends ValidationException {
  constructor(message = 'Argument contains zero') {
    super(message, NumberExceptionCodes.containsZero);
  }
}
