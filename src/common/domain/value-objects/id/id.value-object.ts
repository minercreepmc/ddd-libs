import { ValueObject } from '@domain/base-classes';

export abstract class ID extends ValueObject<string> {
  protected constructor(value: string) {
    super({ value });
  }
}
