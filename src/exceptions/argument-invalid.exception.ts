import { BaseException } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentInvalidExeception extends BaseException {
  readonly code = ExeceptionCodes.argumentInvalid;
  public static create(message: string) {
    return new ArgumentInvalidExeception(message);
  }
}
