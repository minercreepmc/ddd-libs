import { ValueObject } from "@domain/value-object.abstract";

export abstract class ID extends ValueObject<string> {
  protected constructor(value: string) {
    super({ value });
  }
}
