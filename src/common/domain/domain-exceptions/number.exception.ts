import { ValidationExceptionBase } from './exception.base';

export enum NumberExceptionCodes {
  containsFloat = 'NUMBER.EXCEPTION.CONTAINS_FLOAT',
  containsInteger = 'NUMBER.EXCEPTION.CONTAINS_INTEGER',
  outofBounds = 'NUMBER.EXCEPTION.OUT_OF_BOUNDS',
  containsPositive = 'NUMBER.EXCEPTION.CONTAINS_POSITIVE',
  containsNegative = 'NUMBER.EXCEPTION.CONTAINS_NEGATIVE',
  containsZero = 'NUMBER.EXCEPTION.CONTAINS_ZERO',
}

export class ArgumentContainsFloatException extends ValidationExceptionBase {
  readonly code = NumberExceptionCodes.containsFloat;
  readonly message = 'Argument contains float';
}

export class ArgumentContainsIntegerException extends ValidationExceptionBase {
  readonly code = NumberExceptionCodes.containsInteger;
  readonly message = 'Argument contains integer';
}

export class ArgumentOutofBoundsException extends ValidationExceptionBase {
  readonly code = NumberExceptionCodes.outofBounds;
  readonly message = 'Argument out of bounds';
}

export class ArgumentContainsPositiveException extends ValidationExceptionBase {
  readonly code = NumberExceptionCodes.containsPositive;
  readonly message = 'Argument contains positive';
}

export class ArgumentContainsNegativeException extends ValidationExceptionBase {
  readonly code = NumberExceptionCodes.containsNegative;
  readonly message = 'Argument contains negative';
}

export class ArgumentContainsZeroException extends ValidationExceptionBase {
  readonly code = NumberExceptionCodes.containsZero;
  readonly message = 'Argument contains zero';
}
