import { ValueObject } from '@domain/base-classes';

export abstract class ID extends ValueObject<string> {
  get value(): string {
    return this.props.value;
  }

  protected constructor(value: string) {
    super({ value });
  }
}
