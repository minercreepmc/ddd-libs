import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * Represents a district as a value object
 */
export class DistrictValueObject extends AbstractValueObject<string> {
  /**
   * The regular expression pattern to validate the district format of Vietnam
   *
   * The pattern matches strings that begin and end with a letter or a number, and may contain letters,
   * numbers, whitespace, and dashes in between, but not at the start or end of the string. The pattern
   * also supports Vietnamese accents and diacritical marks.
   */
  private static readonly VIETNAM_FORMAT =
    /^[a-zA-Z0-9À-ỹà-ỹ][a-zA-Z0-9À-ỹà-ỹ \-]*[a-zA-Z0-9À-ỹà-ỹ]$/;

  /**
   * Validates if the given district candidate string has a valid format
   * @param candidate The string to validate
   * @returns True if the string is valid, false otherwise
   */
  static isValidFormat(candidate: string) {
    return this.VIETNAM_FORMAT.test(candidate);
  }

  /**
   * Creates a new instance of the district value object
   * @param district The district string
   * @throws ArgumentInvalidException if the district format is not valid
   */
  constructor(district: string) {
    if (!DistrictValueObject.isValidFormat(district)) {
      throw new ArgumentInvalidException('Invalid district format');
    }
    super({ value: district });
  }
}
