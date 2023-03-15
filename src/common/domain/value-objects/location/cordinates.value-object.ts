import { LatitudeValueObject } from './latitude.value-object';
import { LongitudeValueObject } from './longitude.value-object';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractValueObject } from '../value-object.abstract';

/**
 * An interface that defines the structure of cordinates details
 */
export interface CordinatesDetails {
  latitude: LatitudeValueObject;
  longitude: LongitudeValueObject;
}

/**
 * A value object that represents the cordinates of a place
 *
 * @extends AbstractValueObject<CordinatesDetails>
 */
export class CordinatesValueObject extends AbstractValueObject<CordinatesDetails> {
  /**
   * Creates an instance of CordinatesValueObject.
   *
   * @param cordinates The location cordinates details
   *
   * @throws ArgumentInvalidException when the given cordinates are not valid
   */
  constructor(cordinates: CordinatesDetails) {
    if (!CordinatesValueObject.isValidFormat(cordinates)) {
      throw new ArgumentInvalidException('Invalid cordinates');
    }
    super(cordinates);
  }

  get latitude() {
    return this.details.latitude;
  }

  get longitude() {
    return this.details.longitude;
  }
  /**
   * Determines if a given location is valid.
   *
   * @param candidate - The candidate to validate.
   * @returns `true` if the candidate is valid, `false` otherwise.
   */
  static isValidFormat(candidate: unknown) {
    if (typeof candidate !== 'object' || candidate === null) {
      return false;
    }

    if (
      !(candidate as CordinatesDetails).latitude ||
      !(candidate as CordinatesDetails).longitude
    ) {
      return false;
    }

    const typedCandidate = candidate as CordinatesDetails;

    if (
      !(
        typedCandidate.longitude instanceof LongitudeValueObject &&
        typedCandidate.latitude instanceof LatitudeValueObject
      )
    ) {
      return false;
    }
    return true;
  }
}
