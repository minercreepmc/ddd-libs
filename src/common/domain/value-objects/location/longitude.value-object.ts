import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

export class LongitudeValueObject extends AbstractValueObject<number> {
  static isValidFormat(candidate: unknown) {
    if (typeof candidate !== 'number') {
      return false;
    }
    if (Number.isNaN(candidate)) {
      return false;
    }
    if (candidate < -180 || candidate > 180) {
      return false;
    }
    return true;
  }

  constructor(value: number) {
    if (!LongitudeValueObject.isValidFormat(value)) {
      throw new ArgumentInvalidException('Invalid longitude value');
    }
    super({ value });
  }
}
