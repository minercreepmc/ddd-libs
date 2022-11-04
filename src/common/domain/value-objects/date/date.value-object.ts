import { ArgumentInvalidExeception } from '@exceptions';
import { ValueObject } from '@domain/base-classes';

export type DateVOValue = Date | string | number;

export class DateVO extends ValueObject<DateVOValue> {
  public get value(): DateVOValue {
    return this.props.value;
  }

  public static create(value: DateVOValue): DateVO {
    const dateVo = new DateVO(value);
    return dateVo;
  }

  public guard() {
    if (!DateVO.isValid(this)) {
      throw new ArgumentInvalidExeception('Incorrect date');
    }
  }

  public static isValid(candidate: DateVOValue | DateVO) {
    let parsedCandidate: DateVOValue;
    if (typeof candidate === 'string') {
      parsedCandidate = Date.parse(candidate.trim());
    } else if (candidate instanceof DateVO) {
      parsedCandidate = Date.parse(candidate.value.toString());
    }
    return Boolean(!Number.isNaN(parsedCandidate));
  }

  public static now() {
    return new DateVO(Date.now());
  }

  private constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date });
  }
}
