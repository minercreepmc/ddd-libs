import { ValueObject } from '@domain/value-object.abstract';
import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';

export type DateVOValue = Date | string | number;

export class DateVO extends ValueObject<Date> {
  public static create(value: DateVOValue): DateVO {
    const dateVo = new DateVO(value);
    return dateVo;
  }

  public guard(): void {
    if (!DateVO.isValid(this)) {
      throw new ArgumentInvalidExeception('Incorrect date');
    }
  }

  public static isValid(candidate: DateVO | string): boolean {
    let parsedCandidate: DateVOValue;
    if (typeof candidate === 'string') {
      parsedCandidate = Date.parse(candidate.trim());
    } else if (candidate instanceof DateVO) {
      parsedCandidate = Date.parse(candidate.unpack().toString());
    }
    return Boolean(!Number.isNaN(parsedCandidate));
  }

  public static now(): DateVO {
    return new DateVO(Date.now());
  }

  private constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date });
  }
}
