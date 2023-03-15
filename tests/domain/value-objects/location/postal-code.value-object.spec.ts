import { PostalCodeValueObject } from '@domain/value-objects/location';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('PostalCodeValueObject', () => {
  describe('constructor', () => {
    it('should create a new instance of PostalCodeValueObject with a valid postal code', () => {
      const code = '70000';
      const postalCode = new PostalCodeValueObject(code);
      expect(postalCode.unpack()).toBe(code);
    });

    it('should throw an ArgumentInvalidException if the postal code is not a valid format', () => {
      const code = '123';
      expect(() => new PostalCodeValueObject(code)).toThrow(
        ArgumentInvalidException
      );
    });
  });

  describe('isValidFormat', () => {
    it('should return true for a valid postal code', () => {
      const code = '70000';
      expect(PostalCodeValueObject.isValidFormat(code)).toBe(true);
    });

    it('should return false for an invalid postal code', () => {
      const code = '123';
      expect(PostalCodeValueObject.isValidFormat(code)).toBe(false);
    });
  });
});
