/* eslint-disable jest/no-conditional-expect */
import {
  ArgumentNotANumberException,
  ArgumentOutofBoundsException,
  MultipleExceptions,
  NumericOptionIsNotValid,
  NumericValueObject,
  NumericValueObjectOptions,
} from '@domain';

describe('NumericValueObject', () => {
  class CustomNumericValueObject extends NumericValueObject<CustomNumericValueObject> {
    constructor(options: number) {
      super(options);
    }
  }

  describe('NumericValueObject Utils', () => {
    describe('isInteger', () => {
      it('should return true for integer values', () => {
        expect(NumericValueObject.isInteger(42)).toBe(true);
        expect(NumericValueObject.isInteger(-10)).toBe(true);
        expect(NumericValueObject.isInteger(0)).toBe(true);
      });

      it('should return false for non-integer values', () => {
        expect(NumericValueObject.isInteger(3.14)).toBe(false);
        expect(NumericValueObject.isInteger(NaN)).toBe(false);
        expect(NumericValueObject.isInteger(Infinity)).toBe(false);
        expect(NumericValueObject.isInteger(-5.2)).toBe(false);
      });
    });

    describe('isFloat', () => {
      it('should return true for floating point values', () => {
        expect(NumericValueObject.isFloat(3.14)).toBe(true);
        expect(NumericValueObject.isFloat(-2.5)).toBe(true);
      });

      it('should return false for non-floating point values', () => {
        expect(NumericValueObject.isFloat(42)).toBe(false);
        expect(NumericValueObject.isFloat(-10)).toBe(false);
        expect(NumericValueObject.isFloat(0)).toBe(false);
      });
    });

    describe('isWithinBounds', () => {
      it('should return true if value is within bounds', () => {
        expect(NumericValueObject.isWithinBounds(42, 0, 50)).toBe(true);
        expect(NumericValueObject.isWithinBounds(-10, -20, 0)).toBe(true);
        expect(NumericValueObject.isWithinBounds(0, -10, 10)).toBe(true);
      });

      it('should return false if value is outside of bounds', () => {
        expect(NumericValueObject.isWithinBounds(42, 0, 10)).toBe(false);
        expect(NumericValueObject.isWithinBounds(-10, 0, 10)).toBe(false);
        expect(NumericValueObject.isWithinBounds(0, 10, 20)).toBe(false);
      });

      it('should return true if bounds are not provided', () => {
        expect(
          NumericValueObject.isWithinBounds(42, undefined, undefined)
        ).toBe(true);
      });
    });

    describe('isAllowPositive', () => {
      it('should return true if value is positive and containsPositive option is true', () => {
        const options = { containsPositive: true };
        expect(NumericValueObject.isAllowPositive(10, options)).toBe(true);
      });

      it('should return false if value is negative and containsPositive option is true', () => {
        const options = { containsPositive: true };
        expect(NumericValueObject.isAllowPositive(-10, options)).toBe(true);
      });

      it('should return false if value is zero and containsPositive option is true', () => {
        const options = { containsPositive: true };
        expect(NumericValueObject.isAllowPositive(0, options)).toBe(true);
      });

      it('should return false if containsPositive option is false', () => {
        const options = { containsPositive: false };
        expect(NumericValueObject.isAllowPositive(10, options)).toBe(false);
      });
    });

    describe('isAllowNegative', () => {
      it('should return true if value is negative and containsNegative option is true', () => {
        const options = { containsNegative: true };
        expect(NumericValueObject.isAllowNegative(-10, options)).toBe(true);
      });

      it('should return false if value is positive and containsNegative option is true', () => {
        const options = { containsNegative: true };
        expect(NumericValueObject.isAllowNegative(10, options)).toBe(true);
      });

      it('should return false if value is zero and containsNegative option is true', () => {
        const options = { containsNegative: true };
        expect(NumericValueObject.isAllowNegative(0, options)).toBe(true);
      });

      it('should return false if containsNegative option is false', () => {
        const options = { containsNegative: false };
        expect(NumericValueObject.isAllowNegative(-10, options)).toBe(false);
      });
    });

    describe('isAllowedZero', () => {
      it('returns true if value is zero and containsZero is true', () => {
        const value = 0;
        const options = {
          containsZero: true,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(true);
      });

      it('returns true if value is not zero and containsZero is true', () => {
        const value = 42;
        const options = {
          containsZero: true,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(true);
      });

      it('returns false if value is zero and containsZero is false', () => {
        const value = 0;
        const options = {
          containsZero: false,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(false);
      });

      it('returns true if value is not zero and containsZero is false', () => {
        const value = 42;
        const options = {
          containsZero: false,
        };
        expect(NumericValueObject.isAllowedZero(value, options)).toBe(true);
      });
    });

    describe('isValidOptions', () => {
      it('returns false for non-object input', () => {
        const input = 123;
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(false);
      });

      it('returns false for null input', () => {
        const input: any = null;
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(false);
      });

      it('returns false for invalid options object', () => {
        const input = {
          containsZero: 'true',
          containsInteger: 123,
          containsFloat: 'false',
          containsNegative: true,
          containsPositive: 0,
          minValue: 'min',
          maxValue: 'max',
        };
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(false);
      });

      it('returns true for valid options object', () => {
        const input = {
          containsZero: true,
          containsInteger: false,
          containsFloat: true,
          containsNegative: true,
          containsPositive: false,
          minValue: -100,
          maxValue: 100,
        };
        const result = NumericValueObject.isValidOptions(input);
        expect(result).toBe(true);
      });
    });
  });

  describe('constructor', () => {
    it('should create a NumericValueObject instance with valid value and options', () => {
      const value = 5;
      const options = {
        containsZero: true,
        containsInteger: true,
        containsFloat: true,
        containsNegative: true,
        containsPositive: true,
        minValue: -10,
        maxValue: 10,
      };

      const obj = new NumericValueObject(value, options);

      expect(obj.unpack()).toBe(value);
      expect(obj.getOptions()).toEqual(options);
    });

    it('should throw an exception if value is not a number', () => {
      const value = 'not a number' as unknown as number;
      const options = {
        containsZero: true,
        containsInteger: true,
        containsFloat: true,
        containsNegative: true,
        containsPositive: true,
        minValue: -10,
        maxValue: 10,
      };
      try {
        new NumericValueObject(value, options);
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const exceptions = e as MultipleExceptions;
        expect(exceptions.exceptions).toEqual(
          expect.arrayContaining([new ArgumentNotANumberException()])
        );
      }
    });

    it('should throw an exception if options are not valid', () => {
      const value = 5;
      const options = {
        containsZero: true,
        containsInteger: 'not a boolean', // invalid option
        containsFloat: true,
        containsNegative: true,
        containsPositive: true,
        minValue: -10,
        maxValue: 10,
      } as unknown as NumericValueObjectOptions;

      expect(() => {
        new NumericValueObject(value, options);
      }).toThrow(NumericOptionIsNotValid);
    });

    it('should throw an exception if value is not valid', () => {
      const value = 15;
      const options = {
        containsZero: true,
        containsInteger: true,
        containsFloat: true,
        containsNegative: true,
        containsPositive: true,
        minValue: -10,
        maxValue: 10,
      };

      try {
        new NumericValueObject(value, options);
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);

        const typedException = e as MultipleExceptions;

        expect(typedException.exceptions).toEqual(
          expect.arrayContaining([new ArgumentOutofBoundsException()])
        );
      }
    });
  });

  describe('add()', () => {
    it('should add two numbers and return a new NumericValueObject instance', () => {
      const num1 = new NumericValueObject(5);
      const num2 = new NumericValueObject(3);
      const result = num1.add(num2);
      expect(result).toBeInstanceOf(NumericValueObject);
      expect(result.getValue()).toEqual(8);
    });

    it('should throw an MultipleArgumentException that include ArgumentNotANumberException if the value to add is not a number', () => {
      const num1 = new NumericValueObject(5, { minValue: 0, maxValue: 10 });
      const invalidValue =
        'not a number' as unknown as CustomNumericValueObject;

      expect(() => {
        num1.add(invalidValue);
      }).toThrow(TypeError);
    });

    it('should throw an MultipleArgumentException that include ArgumentOutofBoundsException if the result would be less than the minimum allowed value', () => {
      const num1 = new NumericValueObject(5, { minValue: 0, maxValue: 10 });
      const num2 = new NumericValueObject(-10);
      try {
        num1.add(num2);
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const typedException = e as MultipleExceptions;
        expect(typedException.exceptions).toEqual(
          expect.arrayContaining([new ArgumentOutofBoundsException()])
        );
      }
    });

    it('should throw an MultipleArgumentException contains ArgumentOutofBoundsException if the result would be greater than the maximum allowed value', () => {
      const num1 = new NumericValueObject(5, { minValue: 0, maxValue: 10 });
      const num2 = new NumericValueObject(10);
      try {
        num1.add(num2);
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const typedException = e as MultipleExceptions;
        expect(typedException.exceptions).toEqual(
          expect.arrayContaining([new ArgumentOutofBoundsException()])
        );
      }
    });
  });

  describe('subtract()', () => {
    it('should subtract a positive value from a positive value', () => {
      const num1 = new NumericValueObject(5);
      const num2 = new NumericValueObject(2);
      const result = num1.subtract(num2);
      expect(result.getValue()).toBe(3);
    });

    it('should subtract a negative value from a positive value', () => {
      const num1 = new NumericValueObject(5);
      const num2 = new NumericValueObject(-2);
      const result = num1.subtract(num2);
      expect(result.getValue()).toBe(7);
    });

    it('should subtract a positive value from a negative value', () => {
      const num1 = new NumericValueObject(-5);
      const num2 = new NumericValueObject(2);
      const result = num1.subtract(num2);
      expect(result.getValue()).toBe(-7);
    });

    it('should subtract a negative value from a negative value', () => {
      const num1 = new NumericValueObject(-5);
      const num2 = new NumericValueObject(-2);
      const result = num1.subtract(num2);
      expect(result.getValue()).toBe(-3);
    });

    it('should throw an exception if the value to subtract is not a number', () => {
      const num = new NumericValueObject(5);

      expect(() => {
        num.subtract('test' as unknown as CustomNumericValueObject);
      }).toThrow(TypeError);
    });

    it('should throw an exception if the result of the subtraction is an invalid number', () => {
      const num = new NumericValueObject(5, { minValue: 0 });

      try {
        num.subtract(new NumericValueObject(10, { minValue: 0 }));
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);
        const typedException = e as MultipleExceptions;
        expect(typedException.exceptions).toEqual(
          expect.arrayContaining([new ArgumentOutofBoundsException()])
        );
      }
    });
  });

  describe('isLessThan', () => {
    it('should return true if the value is less than the other value', () => {
      const value = new NumericValueObject(5);
      const other = new NumericValueObject(10);
      expect(value.isLessThan(other)).toBe(true);
    });

    it('should return false if the value is greater than or equal to the other value', () => {
      const value = new NumericValueObject(10);
      const other = new NumericValueObject(5);
      expect(value.isLessThan(other)).toBe(false);
      expect(value.isLessThan(value)).toBe(false);
    });
  });

  describe('isGreaterThan', () => {
    it('should return true if the value is greater than the other value', () => {
      const value = new NumericValueObject(10);
      const other = new NumericValueObject(5);
      expect(value.isGreaterThan(other)).toBe(true);
    });

    it('should return false if the value is less than or equal to the other value', () => {
      const value = new NumericValueObject(5);
      const other = new NumericValueObject(10);
      expect(value.isGreaterThan(other)).toBe(false);
      expect(value.isGreaterThan(value)).toBe(false);
    });
  });

  describe('isEqualTo', () => {
    it('should return true if the value is equal to the other value', () => {
      const value = new NumericValueObject(5);
      const other = new NumericValueObject(5);
      expect(value.isEqualTo(other)).toBe(true);
    });

    it('should return false if the value is not equal to the other value', () => {
      const value = new NumericValueObject(5);
      const other = new NumericValueObject(10);
      expect(value.isEqualTo(other)).toBe(false);
    });
  });

  describe('isLessThanOrEqualTo', () => {
    it('should return true if the value is less than or equal to the other value', () => {
      const value = new NumericValueObject(5);
      const other = new NumericValueObject(10);
      expect(value.isLessThanOrEqualTo(other)).toBe(true);
      expect(value.isLessThanOrEqualTo(value)).toBe(true);
    });

    it('should return false if the value is greater than the other value', () => {
      const value = new NumericValueObject(10);
      const other = new NumericValueObject(5);
      expect(value.isLessThanOrEqualTo(other)).toBe(false);
    });
  });

  describe('isGreaterThanOrEqualTo', () => {
    it('should return true if the value is greater than or equal to the other value', () => {
      const value = new NumericValueObject(10);
      const other = new NumericValueObject(5);
      expect(value.isGreaterThanOrEqualTo(other)).toBe(true);
      expect(value.isGreaterThanOrEqualTo(value)).toBe(true);
    });

    it('should return false if the value is less than the other value', () => {
      const value = new NumericValueObject(5);
      const other = new NumericValueObject(10);
      expect(value.isGreaterThanOrEqualTo(other)).toBe(false);
    });
  });
});
