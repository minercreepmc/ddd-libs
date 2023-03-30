import { ValidationException } from './exception.base';

export enum TypeExceptionCodes {
  argumentNotANumberException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_NUMBER_EXCEPTION',
  argumentNotAStringException = 'TYPE.EXCEPTION.ARGUMENT_NOT_A_STRING_EXCEPTION',
}

export class ArgumentNotANumberException extends ValidationException {
  constructor() {
    super(
      'Argument not a number',
      TypeExceptionCodes.argumentNotANumberException
    );
  }
}

export class ArgumentNotAStringException extends ValidationException {
  constructor() {
    super(
      'Argument not a string',
      TypeExceptionCodes.argumentNotAStringException
    );
  }
}
