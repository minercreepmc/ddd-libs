import { AbstractValueObject } from '../value-object.abstract';

export abstract class ID extends AbstractValueObject<string> {
  protected constructor(value: string) {
    super({ value });
  }
}
