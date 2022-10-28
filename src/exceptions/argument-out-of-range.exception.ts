import { BaseException } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentOutOfRangeException extends BaseException {
  readonly code = ExeceptionCodes.argumentOutOfRange;
  public static create(message: string) {
    return new ArgumentOutOfRangeException(message);
  }
}
