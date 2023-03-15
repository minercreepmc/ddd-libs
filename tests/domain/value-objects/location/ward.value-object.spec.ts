import { WardValueObject } from '@domain/value-objects/location';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('WardValueObject', () => {
  const validWardNames = ['Phường 5', 'Phường Quang Trung'];
  const invalidWardNames = ['####', '@#$%%^'];
  describe('constructor', () => {
    it('should create new instance of WardValueObject with valid inputs', () => {
      validWardNames.forEach((wardName) => {
        const ward = new WardValueObject(wardName);
        expect(ward.unpack()).toBe(wardName);
      });
    });

    it('should throw an ArgumentInvalidException if inputs is not in a valid format', () => {
      invalidWardNames.forEach((wardName) => {
        expect(() => {
          new WardValueObject(wardName);
        }).toThrow(ArgumentInvalidException);
      });
    });
  });

  describe('isValidFormat', () => {
    it('should return true for valid formats', () => {
      validWardNames.forEach((wardName) => {
        expect(WardValueObject.isValidFormat(wardName)).toBe(true);
      });
    });

    it('should return false for invalid formats', () => {
      invalidWardNames.forEach((wardName) => {
        expect(WardValueObject.isValidFormat(wardName)).toBe(false);
      });
    });
  });
});
