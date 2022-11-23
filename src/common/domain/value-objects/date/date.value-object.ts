import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

export type DateVOValue = Date | string | number;

export class DateVO extends AbstractValueObject<Date> {
  static create(value: DateVOValue): DateVO {
    if (!this.isValid(value))
      throw new ArgumentInvalidExeception(
        'Cannot create DateVO with invalid state'
      );
    const dateVo = new DateVO(value);
    return dateVo;
  }

  static isValid(candidate: DateVOValue): boolean {
    let parsedCandidate: DateVOValue;
    if (typeof candidate === 'string') {
      parsedCandidate = Date.parse(candidate.trim());
    } else if (candidate instanceof DateVO) {
      parsedCandidate = Date.parse(candidate.unpack().toString());
    }
    return Boolean(!Number.isNaN(parsedCandidate));
  }

  static now(): DateVO {
    return new DateVO(Date.now());
  }

  private constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date });
  }
}
