import { ValidationExceptionBase } from './exception.base';

export enum TypeExceptionCodes {
  argumentNotANumberException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_NUMBER_EXCEPTION',
  argumentNotAStringException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_STRING_EXCEPTION',
}

export class ArgumentNotANumberException extends ValidationExceptionBase {
  readonly name = ArgumentNotANumberException.name;
  code = TypeExceptionCodes.argumentNotANumberException;
  message = 'Argument not a number';
}

export class ArgumentNotAStringException extends ValidationExceptionBase {
  readonly name = ArgumentNotAStringException.name;
  code = TypeExceptionCodes.argumentNotAStringException;
  message = 'Argument not a string';
}
