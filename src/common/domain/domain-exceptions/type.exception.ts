import { ValidationExceptionBase } from './exception.base';

export enum TypeExceptionCodes {
  argumentNotANumberException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_NUMBER_EXCEPTION',
  argumentNotAStringException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_STRING_EXCEPTION',
}

export class ArgumentNotANumberException extends ValidationExceptionBase {
  readonly code = TypeExceptionCodes.argumentNotANumberException;
  readonly message = 'Argument not a number';
}

export class ArgumentNotAStringException extends ValidationExceptionBase {
  readonly code = TypeExceptionCodes.argumentNotAStringException;
  readonly message = 'Argument not a string';
}
