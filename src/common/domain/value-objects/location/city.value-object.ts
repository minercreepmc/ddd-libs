import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * A value object representing a city name.
 */
export class CityValueObject extends AbstractValueObject<string> {
  /**
   * The regular expression pattern to validate the city format of Vietnam
   *
   * The pattern matches strings that begin and end with a letter, and may contain letters,
   * numbers, whitespace, and dashes in between, but not at the start or end of the string. The pattern
   * also supports Vietnamese accents and diacritical marks.
   */
  private static readonly VIETNAM_FORMAT =
    /^[a-zA-ZÀ-ỹà-ỹ][a-zA-ZÀ-ỹà-ỹ \-]*[a-zA-ZÀ-ỹà-ỹ]$/;
  /**
   * Determines whether the given string is in a valid format for a city name.
   *
   * @param candidate The string to validate.
   * @returns `true` if the string is in a valid format, `false` otherwise.
   */
  static isValidFormat(candidate: string) {
    return this.VIETNAM_FORMAT.test(candidate);
  }

  /**
   * Initializes a new instance of the `CityValueObject` class with the given city name.
   *
   * @param city The city name.
   * @throws ArgumentInvalidException if the given city name is not in a valid format.
   */
  constructor(city: string) {
    if (!CityValueObject.isValidFormat(city)) {
      throw new ArgumentInvalidException('Invalid city format.');
    }
    super({ value: city });
  }
}
