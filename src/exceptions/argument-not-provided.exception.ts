import { BaseException } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ArgumentNotProvidedException extends BaseException {
  readonly code = ExeceptionCodes.argumentNotProvided;
  public static create(message: string) {
    return new ArgumentNotProvidedException(message);
  }
}
