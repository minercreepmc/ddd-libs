import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

export type DateVOValue = Date | string | number;

export class DateVO extends AbstractValueObject<Date> {
  unpack(): Date {
    return this.details.value as Date;
  }
  static create(value: DateVOValue): DateVO {
    if (!this.isValid(value))
      throw new ArgumentInvalidException(
        'Cannot create DateVO with invalid state'
      );
    const dateVo = new DateVO(value);
    return dateVo;
  }

  static isValid(candidate: DateVOValue): boolean {
    let parsedCandidate: DateVOValue;
    if (typeof candidate === 'string') {
      parsedCandidate = Date.parse(candidate.trim());
    } else if (this.isDateVo(candidate)) {
      return true;
    }
    return Boolean(!Number.isNaN(parsedCandidate));
  }

  static now(): DateVO {
    return new DateVO(Date.now());
  }

  static isDateVo(candidate: unknown): candidate is DateVO {
    return candidate instanceof DateVO;
  }

  protected constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date });
  }
}
