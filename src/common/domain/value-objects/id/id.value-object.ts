import { AbstractValueObject } from '../value-object.abstract';

export class ID extends AbstractValueObject<string> {
  constructor(value: string) {
    super({ value });
  }
}
