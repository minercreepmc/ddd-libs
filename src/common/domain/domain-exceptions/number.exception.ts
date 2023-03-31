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
  readonly name = ArgumentContainsFloatException.name;
  code = NumberExceptionCodes.containsFloat;
  message = 'Argument contains float';
}

export class ArgumentContainsIntegerException extends ValidationExceptionBase {
  readonly name = ArgumentContainsIntegerException.name;
  code = NumberExceptionCodes.containsInteger;
  message = 'Argument contains integer';
}

export class ArgumentOutofBoundsException extends ValidationExceptionBase {
  readonly name = ArgumentOutofBoundsException.name;
  code = NumberExceptionCodes.outofBounds;
  message = 'Argument out of bounds';
}

export class ArgumentContainsPositiveException extends ValidationExceptionBase {
  readonly name = ArgumentContainsPositiveException.name;
  code = NumberExceptionCodes.containsPositive;
  message = 'Argument contains positive';
}

export class ArgumentContainsNegativeException extends ValidationExceptionBase {
  readonly name = ArgumentContainsNegativeException.name;
  code = NumberExceptionCodes.containsNegative;
  message = 'Argument contains negative';
}

export class ArgumentContainsZeroException extends ValidationExceptionBase {
  readonly name = ArgumentContainsZeroException.name;
  code = NumberExceptionCodes.containsZero;
  message = 'Argument contains zero';
}
