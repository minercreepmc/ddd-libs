import { DistrictValueObject } from '@domain';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('DistrictValueObject', () => {
  describe('constructor', () => {
    test('should create a valid instance with a valid district string', () => {
      const district = 'Quận 1';
      const districtValueObject = new DistrictValueObject(district);
      expect(districtValueObject.unpack()).toBe(district);
    });

    test('should throw ArgumentInvalidException with invalid district string', () => {
      const district = 'Invalid District @#';
      expect(() => {
        new DistrictValueObject(district);
      }).toThrow(ArgumentInvalidException);
    });
  });

  describe('isValidFormat', () => {
    test('should return true for a valid district string', () => {
      const district = 'Quận 1';
      expect(DistrictValueObject.isValidFormat(district)).toBe(true);
    });

    test('should return false for an invalid district string', () => {
      const district = 'Invalid District @#';
      expect(DistrictValueObject.isValidFormat(district)).toBe(false);
    });
  });
});
