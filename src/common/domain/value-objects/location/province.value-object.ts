import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * Value object representing a province
 */
export class ProvinceValueObject extends AbstractValueObject<string> {
  /**
   * The regular expression format to validate the province name of Vietnam.
   *
   * The pattern matches strings that begin and end with a letter, and may contain letters,
   * numbers, whitespace, and dashes in between, but not at the start or end of the string. The pattern
   * also supports Vietnamese accents and diacritical marks.
   */
  private static readonly VIETNAM_FORMAT =
    /^[a-zA-ZÀ-ỹà-ỹ][a-zA-ZÀ-ỹà-ỹ \-]*[a-zA-ZÀ-ỹà-ỹ]$/;

  /**
   * Checks if the candidate string matches the format for a valid province name.
   *
   * @param candidate The string to be checked
   * @returns True if the candidate string is a valid format, false otherwise
   */
  static isValidFormat(candidate: string) {
    return this.VIETNAM_FORMAT.test(candidate);
  }

  /**
   * Create a new `VietnamProvinceValueObject`.
   * @param province The string representing a province.
   * @throws ArgumentInvalidException if the province is not in a valid format.
   */
  constructor(province: string) {
    if (!ProvinceValueObject.isValidFormat(province)) {
      throw new ArgumentInvalidException('Invalid province format');
    }
    super({ value: province });
  }
}
