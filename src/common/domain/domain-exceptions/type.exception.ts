import { ValidationExceptionBase } from './exception.base';

export enum TypeExceptionCodes {
  argumentNotANumberException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_NUMBER_EXCEPTION',
  argumentNotAStringException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_STRING_EXCEPTION',
  argumentIsEmptyException = 'TYPE.EXCEPTION.ARGUMENT_IS_EMPTY_EXCEPTION',
  argumentInvalidException = 'TYPE.EXCEPTION.ARGUMENT_INVALID_EXCEPTION',
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

export class ArgumentIsEmptyException extends ValidationExceptionBase {
  readonly name = ArgumentIsEmptyException.name;
  code = TypeExceptionCodes.argumentIsEmptyException;
  message = 'Argument is empty';
}

export class ArgumentInvalidException extends ValidationExceptionBase {
  readonly name = ArgumentInvalidException.name;
  code = TypeExceptionCodes.argumentInvalidException;
  message = 'Argument is invalid';
}
