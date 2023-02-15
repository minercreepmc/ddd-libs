import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from 'ts-common-exceptions';
import { GuardUtils } from './guard';

describe('GuardUtils', () => {
  describe('isEmptyOrThrow', () => {
    it('should throw ArgumentNotProvidedException if value is null', () => {
      expect(() => GuardUtils.isEmptyOrThrow(null)).toThrow(
        ArgumentNotProvidedException
      );
    });

    it('should throw ArgumentNotProvidedException if value is undefined', () => {
      expect(() => GuardUtils.isEmptyOrThrow(undefined)).toThrow(
        ArgumentNotProvidedException
      );
    });

    it('should throw ArgumentInvalidException if value is an empty string', () => {
      expect(() => GuardUtils.isEmptyOrThrow('')).toThrow(
        ArgumentInvalidException
      );
    });

    it('should throw ArgumentInvalidException if value is an empty array', () => {
      expect(() => GuardUtils.isEmptyOrThrow([])).toThrow(
        ArgumentInvalidException
      );
    });

    it('should throw ArgumentInvalidException if array contains only null or undefined values', () => {
      expect(() => GuardUtils.isEmptyOrThrow([null, undefined])).toThrow(
        ArgumentInvalidException
      );
    });

    it('should not throw an exception if value is not empty', () => {
      expect(() => GuardUtils.isEmptyOrThrow('hello')).not.toThrow();
    });
  });

  describe('isNullOrUndefined', () => {
    it('should return true if value is null', () => {
      expect(GuardUtils.isNullOrUndefined(null)).toBe(true);
    });

    it('should return true if value is undefined', () => {
      expect(GuardUtils.isNullOrUndefined(undefined)).toBe(true);
    });

    it('should return false if value is not null or undefined', () => {
      expect(GuardUtils.isNullOrUndefined('hello')).toBe(false);
    });
  });

  describe('isEmptyString', () => {
    it('should return true if value is an empty string', () => {
      expect(GuardUtils.isEmptyString('')).toBe(true);
    });

    it('should return false if value is not an empty string', () => {
      expect(GuardUtils.isEmptyString('hello')).toBe(false);
    });
  });

  describe('isEmptyArray', () => {
    it('should return true if value is an empty array', () => {
      expect(GuardUtils.isEmptyArray([])).toBe(true);
    });

    it('should return false if value is not an empty array', () => {
      expect(GuardUtils.isEmptyArray([1, 2, 3])).toBe(false);
    });
  });

  describe('isArrayContainEmpty', () => {
    it('should return true if array contains only null or undefined values', () => {
      expect(GuardUtils.isArrayContainEmpty([null, undefined])).toBe(true);
    });

    it('should return false if array does not contain only null or undefined values', () => {
      expect(GuardUtils.isArrayContainEmpty([null, 1, undefined, 2])).toBe(
        false
      );
    });
  });
});
