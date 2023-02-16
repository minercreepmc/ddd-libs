import { GuardUtils } from './guard';

describe('GuardUtils', () => {
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

  describe('isFalsy', () => {
    it('should return true for falsy values', () => {
      expect(GuardUtils.isFalsy(false)).toBe(true);
      expect(GuardUtils.isFalsy(0)).toBe(true);
      expect(GuardUtils.isFalsy('')).toBe(true);
      expect(GuardUtils.isFalsy(null)).toBe(true);
      expect(GuardUtils.isFalsy(undefined)).toBe(true);
    });

    it('should return false for truthy values', () => {
      expect(GuardUtils.isFalsy(true)).toBe(false);
      expect(GuardUtils.isFalsy(1)).toBe(false);
      expect(GuardUtils.isFalsy('hello')).toBe(false);
      expect(GuardUtils.isFalsy({})).toBe(false);
      expect(GuardUtils.isFalsy([])).toBe(false);
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

  describe('isEmptyObject', () => {
    it('returns true for an empty object', () => {
      expect(GuardUtils.isEmptyObject({})).toBe(true);
    });

    it('returns false for an object with properties', () => {
      expect(GuardUtils.isEmptyObject({ a: 1 })).toBe(false);
    });

    it('returns false for an array', () => {
      expect(GuardUtils.isEmptyObject([])).toBe(false);
    });

    it('returns false for a non-object value', () => {
      expect(GuardUtils.isEmptyObject(5)).toBe(false);
    });

    it('returns false for a null value', () => {
      expect(GuardUtils.isEmptyObject(null)).toBe(false);
    });

    it('returns false for an undefined value', () => {
      expect(GuardUtils.isEmptyObject(undefined)).toBe(false);
    });
  });

  describe('isObjectContainNull', () => {
    it('returns false if object does not contain null and undefined values', () => {
      const obj = {
        foo: 1,
        bar: 'hello',
        baz: { qux: true },
      };

      const result = GuardUtils.isObjectContainNull(obj);

      expect(result).toBe(false);
    });

    it('returns true if object contains undefined values', () => {
      const obj: any = {
        foo: 1,
        bar: undefined,
        baz: { qux: true },
      };

      const result = GuardUtils.isObjectContainNull(obj);

      expect(result).toBe(true);
    });

    it('returns true if object contains null values', () => {
      const obj: any = {
        foo: 1,
        bar: null,
        baz: { qux: true },
      };

      const result = GuardUtils.isObjectContainNull(obj);

      expect(result).toBe(true);
    });

    it('returns true if object contains both undefined and null values', () => {
      const obj: any = {
        foo: 1,
        bar: null,
        baz: { qux: true },
        quux: undefined,
      };

      const result = GuardUtils.isObjectContainNull(obj);

      expect(result).toBe(true);
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
      expect(GuardUtils.isArrayContainNull([null, undefined])).toBe(true);
    });

    it('should return false if array does not contain only null or undefined values', () => {
      expect(GuardUtils.isArrayContainNull([null, 1, undefined, 2])).toBe(
        false
      );
    });
  });
});
