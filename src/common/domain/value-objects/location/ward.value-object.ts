import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * Value object for representing a ward
 */
export class WardValueObject extends AbstractValueObject<string> {
  /**
   * Regular expression for a valid ward format of Vietnam.
   *
   * This pattern allows for letters and numbers,
   * Vietnamese characters with accents, spaces, hyphens, forward slashes, and parentheses.
   */
  private static readonly VIETNAM_FORMAT = /^[a-zA-Z0-9À-ỹà-ỹ \-\/\(\)]+$/u;

  /**
   * Check if a string is in a valid ward format.
   * @param candidate The string to check.
   * @returns True if the string is in a valid format, false otherwise.
   */
  static isValidFormat(candidate: string) {
    return this.VIETNAM_FORMAT.test(candidate);
  }

  /**
   * Create a new `WardValueObject`.
   * @param ward The string representing the ward.
   * @throws ArgumentInvalidException if the ward is not in a valid format.
   */
  constructor(ward: string) {
    if (!WardValueObject.isValidFormat(ward)) {
      throw new ArgumentInvalidException(`Invalid ward format: ${ward}`);
    }
    super({ value: ward });
  }
}
