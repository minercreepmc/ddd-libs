import { LongitudeValueObject } from '@domain/value-objects/location';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('LongitudeValueObject', () => {
  describe('constructor', () => {
    it('should create a LongitudeValueObject instance with a valid value', () => {
      const longitudeValue = new LongitudeValueObject(10);
      expect(longitudeValue.unpack()).toBe(10);
    });

    it('should throw an exception for invalid longitude', () => {
      expect(() => new LongitudeValueObject(181)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LongitudeValueObject(-181)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LongitudeValueObject('invalid' as any)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new LongitudeValueObject(null as any)).toThrow(
        ArgumentInvalidException
      );
    });
  });
});
