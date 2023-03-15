import { LatitudeValueObject } from '@domain/value-objects/location';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('LatitudeValueObject', () => {
  describe('isValidFormat', () => {
    it('should return true for valid latitude', () => {
      expect(LatitudeValueObject.isValidFormat(45)).toBe(true);
      expect(LatitudeValueObject.isValidFormat(-12.345)).toBe(true);
      expect(LatitudeValueObject.isValidFormat(90)).toBe(true);
      expect(LatitudeValueObject.isValidFormat(-90)).toBe(true);
    });

    it('should return false for invalid latitude', () => {
      expect(LatitudeValueObject.isValidFormat(NaN)).toBe(false);
      expect(LatitudeValueObject.isValidFormat(null)).toBe(false);
      expect(LatitudeValueObject.isValidFormat(undefined)).toBe(false);
      expect(LatitudeValueObject.isValidFormat('not a number')).toBe(false);
      expect(LatitudeValueObject.isValidFormat(91)).toBe(false);
      expect(LatitudeValueObject.isValidFormat(-91)).toBe(false);
    });
  });

  describe('constructor', () => {
    it('should create a LatitudeValueObject instance for valid latitude', () => {
      const latitude = new LatitudeValueObject(12.345);
      expect(latitude).toBeInstanceOf(LatitudeValueObject);
      expect(latitude.unpack()).toBe(12.345);
    });

    it('should throw an exception for invalid latitude', () => {
      expect(() => new LatitudeValueObject(91)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LatitudeValueObject(-91)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LatitudeValueObject(NaN)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LatitudeValueObject(null)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LatitudeValueObject(undefined)).toThrow(
        ArgumentInvalidException
      );
      expect(
        () => new LatitudeValueObject('not a number' as unknown as number)
      ).toThrow(ArgumentInvalidException);
    });
  });
});
