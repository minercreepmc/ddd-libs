import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * Class representing Postal Code Value Object.
 * @extends AbstractValueObject<number>
 */
export class PostalCodeValueObject extends AbstractValueObject<string> {
  /**
   * The regular expression format to validate the postal code of Vietnam.
   */
  private static readonly VIETNAM_FORMAT = /^\d{5}$/;

  /**
   * Check if a candidate number is a valid format for postal code in Vietnam.
   * @param candidate - The number to be checked.
   * @returns A boolean indicating whether the format is valid or not.
   */
  static isValidFormat(candidate: unknown) {
    if (typeof candidate !== 'string') {
      return false;
    }
    return this.VIETNAM_FORMAT.test(candidate);
  }
  /**
   * Creates an instance of PostalCodeValueObject.
   * @param code - The value of the Postal Code Value Object.
   * @throws {ArgumentInvalidException} If the value of the Postal Code is not a valid format.
   */
  constructor(code: string) {
    if (!PostalCodeValueObject.isValidFormat(code)) {
      throw new ArgumentInvalidException('Postal code is not a valid format.');
    }
    super({ value: code });
  }
}
