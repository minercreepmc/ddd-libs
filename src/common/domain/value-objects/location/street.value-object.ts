import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * Value object representing a street
 */
export class StreetValueObject extends AbstractValueObject<string> {
  /**
   * The regular expression format to validate the street name of Vietnam.
   *
   * This pattern matches strings that begin and end with a letter or number,
   * and may contain letters, numbers, spaces, hyphens, underscores, and special characters in between,
   * but not at the start or end of the string. It also supports Vietnamese accented letters using the Unicode character
   */
  private static readonly VIETNAM_FORMAT = /^[a-zA-Z0-9À-ỹà-ỹ ,\\/\\.-_']+$/u;
  /**
   * Checks if the candidate string matches the format for a valid street name.
   *
   * @param candidate The string to be checked
   * @returns True if the candidate string is a valid format, false otherwise
   */
  static isValidFormat(candidate: string) {
    return this.VIETNAM_FORMAT.test(candidate);
  }

  /**
   * Creates a new instance of the StreetValueObject.
   *
   * @param street The street name
   * @throws {ArgumentInvalidException} If the street name does not match the valid format
   */
  constructor(street: string) {
    if (!StreetValueObject.isValidFormat(street)) {
      throw new ArgumentInvalidException(`Invalid street format: ${street}`);
    }
    super({ value: street });
  }
}
