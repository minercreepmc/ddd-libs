import { BaseException } from './exception.base';
import { ExeceptionCodes } from './exception.codes';

export class ConflictException extends BaseException {
  readonly code = ExeceptionCodes.conflict;
}
