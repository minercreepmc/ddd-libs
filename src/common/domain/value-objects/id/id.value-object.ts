import { ValueObject } from '@core/domain/base-classes/value-object.base';

export abstract class ID extends ValueObject<string> {
  get value(): string {
    return this.props.value;
  }

  protected constructor(value: string) {
    super({ value });
  }
}
