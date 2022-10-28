import { BaseException } from '@exceptions';
import { Result } from 'oxide.ts';
import { DateVO } from './date.value-object';

describe('date value object', () => {
  it('should fail to create invalid date', () => {
    const dateOrError = Result.safe(DateVO.create, 'invalid');
    expect(dateOrError.unwrapErr() instanceof BaseException).toBe(true);
  });

  it('should be able to create valid date', () => {
    const dateOrError = Result.safe(DateVO.create, '02-10-2022');
    expect(dateOrError.isOk()).toBe(true);
  });
});
