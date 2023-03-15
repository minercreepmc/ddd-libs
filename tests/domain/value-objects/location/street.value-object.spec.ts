import { StreetValueObject } from '@domain/value-objects/location';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('StreetValueObject', () => {
  const validStreets = ['Điện Biên Phủ', '3/2'];

  const invalidStreets = ['#####', '@#!@$!'];
  describe('constructor', () => {
    it('should create new StreetValueObject with a valid street name', () => {
      validStreets.forEach((street) => {
        const streetValueObject = new StreetValueObject(street);
        expect(streetValueObject.unpack()).toBe(street);
      });
    });

    it('should throw an ArgumentInvalidException if the street name is not a valid format', () => {
      invalidStreets.forEach((street) => {
        expect(() => new StreetValueObject(street)).toThrow(
          ArgumentInvalidException
        );
      });
    });
  });

  describe('isValidFormat', () => {
    it('should return true if the candidate string is valid format', () => {
      validStreets.forEach((street) => {
        const result = StreetValueObject.isValidFormat(street);
        expect(result).toBe(true);
      });
    });

    it('should return false if the candidate string is not a valid format', () => {
      invalidStreets.forEach((street) => {
        const result = StreetValueObject.isValidFormat(street);
        expect(result).toBe(false);
      });
    });
  });
});
