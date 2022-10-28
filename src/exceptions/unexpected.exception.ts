import { BaseException } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class UnexpectedException extends BaseException {
  readonly code = ExeceptionCodes.unexpected;
  public static create(error: any) {
    return new UnexpectedException(
      error.message ? error.message : 'Unexpected Exception',
    );
  }
}
