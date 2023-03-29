/* eslint-disable jest/no-conditional-expect */
import { ArgumentContainsSymbolException, MultipleExceptions } from '@domain';
import {
  IsMatchingRegexOptions,
  IsValueIncludedInAllowedValuesOptions,
  TextValueObject,
} from '@domain/value-objects';

describe('TextValueObject', () => {
  describe('isAllowLength', () => {
    it('should return true for a value that is within the allowed length range', () => {
      const value = 'hello world';
      const options = {
        minLength: 5,
        maxLength: 15,
      };
      expect(TextValueObject.isAllowLength(value, options)).toBe(true);
    });

    it('should return false for a value that is too short', () => {
      const value = 'hello';
      const options = {
        minLength: 10,
        maxLength: 15,
      };
      expect(TextValueObject.isAllowLength(value, options)).toBe(false);
    });

    it('should return false for a value that is too long', () => {
      const value = 'hello world!';
      const options = {
        minLength: 5,
        maxLength: 10,
      };
      expect(TextValueObject.isAllowLength(value, options)).toBe(false);
    });
  });

  describe('isHigherEqualThanMinLength', () => {
    it('should return true for a value that is at least the minimum length', () => {
      const value = 'hello';
      const options = {
        minLength: 5,
      };
      expect(TextValueObject.isHigherEqualThanMinLength(value, options)).toBe(
        true
      );
    });

    it('should return false for a value that is shorter than the minimum length', () => {
      const value = 'hi';
      const options = {
        minLength: 5,
      };
      expect(TextValueObject.isHigherEqualThanMinLength(value, options)).toBe(
        false
      );
    });
  });

  describe('isLowerEqualThanMaxLength', () => {
    it('should return true for a value that is at most the maximum length', () => {
      const value = 'hello';
      const options = {
        maxLength: 5,
      };
      expect(TextValueObject.isLowerEqualThanMaxLength(value, options)).toBe(
        true
      );
    });

    it('should return false for a value that is longer than the maximum length', () => {
      const value = 'hello world';
      const options = {
        maxLength: 5,
      };
      expect(TextValueObject.isLowerEqualThanMaxLength(value, options)).toBe(
        false
      );
    });
  });

  describe('isEmpty', () => {
    it('should return true for an empty string', () => {
      const value = '';
      expect(TextValueObject.isEmpty(value)).toBe(true);
    });

    it('should return true for a string consisting of only whitespace', () => {
      const value = '    ';
      expect(TextValueObject.isEmpty(value)).toBe(true);
    });

    it('should return false for a non-empty string', () => {
      const value = 'hello world';
      expect(TextValueObject.isEmpty(value)).toBe(false);
    });

    it('should return true for null value', () => {
      const value: any = null;
      expect(TextValueObject.isEmpty(value)).toBe(true);
    });

    it('should return true for undefined value', () => {
      const value: any = undefined;
      expect(TextValueObject.isEmpty(value)).toBe(true);
    });
  });

  describe('isAllowedToBeEmpty', () => {
    it('should return true for an empty string when allowEmpty is true', () => {
      const value = '';
      const options = {
        allowEmpty: true,
      };
      expect(TextValueObject.isAllowedToBeEmpty(value, options)).toBe(true);
    });

    it('should return true for a non-empty string when allowEmpty is true', () => {
      const value = 'hello world';
      const options = {
        allowEmpty: true,
      };
      expect(TextValueObject.isAllowedToBeEmpty(value, options)).toBe(true);
    });

    it('should return false for an empty string when allowEmpty is false', () => {
      const value = '';
      const options = {
        allowEmpty: false,
      };
      expect(TextValueObject.isAllowedToBeEmpty(value, options)).toBe(false);
    });

    it('should return true for a non-empty string when allowEmpty is false', () => {
      const value = 'hello world';
      const options = {
        allowEmpty: false,
      };
      expect(TextValueObject.isAllowedToBeEmpty(value, options)).toBe(true);
    });
  });

  describe('isContainsSymbol', () => {
    it('should return true for a string that contains a symbol', () => {
      const value = 'hello$world';
      expect(TextValueObject.isContainsSymbol(value)).toBe(true);
    });

    it('should return false for a string that does not contain a symbol', () => {
      const value = 'hello world';
      expect(TextValueObject.isContainsSymbol(value)).toBe(false);
    });
  });

  describe('isAllowedToHaveSymbols', () => {
    it('should return true for a string that contains a symbol when allowSymbols is true', () => {
      const value = 'hello$world';
      const options = {
        allowSymbols: true,
      };
      expect(TextValueObject.isAllowedToContainsSymbols(value, options)).toBe(
        true
      );
    });

    it('should return true for a string that does not contain a symbol when allowSymbols is true', () => {
      const value = 'hello world';
      const options = {
        allowSymbols: true,
      };
      expect(TextValueObject.isAllowedToContainsSymbols(value, options)).toBe(
        true
      );
    });

    it('should return false for a string that contains a symbol when allowSymbols is false', () => {
      const value = 'hello$world';
      const options = {
        allowSymbols: false,
      };
      expect(TextValueObject.isAllowedToContainsSymbols(value, options)).toBe(
        false
      );
    });

    it('should return true for a string that does not contain a symbol when allowSymbols is false', () => {
      const value = 'hello world';
      const options = {
        allowSymbols: false,
      };
      expect(TextValueObject.isAllowedToContainsSymbols(value, options)).toBe(
        true
      );
    });
  });

  describe('isContainsWhitespace', () => {
    it('should return true for a string with whitespace', () => {
      expect(TextValueObject.isContainsWhitespace('Hello, world!')).toBe(true);
      expect(TextValueObject.isContainsWhitespace('Hello\tworld!')).toBe(true);
      expect(TextValueObject.isContainsWhitespace('Hello\nworld!')).toBe(true);
    });

    it('should return false for a string without whitespace', () => {
      expect(TextValueObject.isContainsWhitespace('Helloworld')).toBe(false);
      expect(TextValueObject.isContainsWhitespace('')).toBe(false);
    });
  });

  describe('isAllowToHaveWhitespace', () => {
    it('returns true if allowWhitespace option is true', () => {
      const value = ' Hello, world! ';
      const options = { allowWhitespace: true };
      expect(TextValueObject.isAllowToContainsWhitespace(value, options)).toBe(
        true
      );
    });

    it('returns false if allowWhitespace option is false and value contains whitespace', () => {
      const value = ' Hello, world! ';
      const options = { allowWhitespace: false };
      expect(TextValueObject.isAllowToContainsWhitespace(value, options)).toBe(
        false
      );
    });

    it('returns true if allowWhitespace option is false and value does not contain whitespace', () => {
      const value = 'Helloworld';
      const options = { allowWhitespace: false };
      expect(TextValueObject.isAllowToContainsWhitespace(value, options)).toBe(
        true
      );
    });
  });

  describe('isContainsUppercase', () => {
    it('returns true if value contains uppercase letters', () => {
      const value = 'Hello, world!';
      expect(TextValueObject.isContainsUppercase(value)).toBe(true);
    });

    it('returns false if value does not contain uppercase letters', () => {
      const value = 'hello, world!';
      expect(TextValueObject.isContainsUppercase(value)).toBe(false);
    });
  });

  describe('isAllowToHaveUppercase', () => {
    it('returns true if allowUppercase option is true', () => {
      const value = 'Hello, world!';
      const options = { allowUppercase: true };
      expect(TextValueObject.isAllowToContainsUppercase(value, options)).toBe(
        true
      );
    });

    it('returns false if allowUppercase option is false and value contains uppercase letters', () => {
      const value = 'Hello, world!';
      const options = { allowUppercase: false };
      expect(TextValueObject.isAllowToContainsUppercase(value, options)).toBe(
        false
      );
    });

    it('returns true if allowUppercase option is false and value does not contain uppercase letters', () => {
      const value = 'hello, world!';
      const options = { allowUppercase: false };
      expect(TextValueObject.isAllowToContainsUppercase(value, options)).toBe(
        true
      );
    });
  });

  describe('isContainsLowercase', () => {
    it('should return true if the string contains lowercase letters', () => {
      const value = 'Hello World';
      expect(TextValueObject.isContainsLowercase(value)).toBe(true);
    });

    it('should return false if the string does not contain lowercase letters', () => {
      const value = 'HELLO WORLD';
      expect(TextValueObject.isContainsLowercase(value)).toBe(false);
    });
  });

  describe('isAllowToHaveLowercase', () => {
    it('should return true if the string is allowed to have lowercase letters', () => {
      const value = 'HELLO WORLD';
      const options = { allowLowercase: true };
      expect(TextValueObject.isAllowToContainsLowercase(value, options)).toBe(
        true
      );
    });

    it('should return true if the string does not contain lowercase letters', () => {
      const value = 'HELLO WORLD';
      const options = { allowLowercase: false };
      expect(TextValueObject.isAllowToContainsLowercase(value, options)).toBe(
        true
      );
    });

    it('should return false if the string contains lowercase letters but is not allowed to have them', () => {
      const value = 'Hello World';
      const options = { allowLowercase: false };
      expect(TextValueObject.isAllowToContainsLowercase(value, options)).toBe(
        false
      );
    });
  });

  describe('isContainsNumber()', () => {
    it('should return true when the string contains a number', () => {
      expect(TextValueObject.isContainsNumber('abc123')).toBe(true);
    });

    it('should return false when the string does not contain a number', () => {
      expect(TextValueObject.isContainsNumber('abc')).toBe(false);
    });
  });

  describe('isAllowToHaveNumbers()', () => {
    it('should return true when the string contains a number and allowNumber is true', () => {
      expect(
        TextValueObject.isAllowToContainsNumbers('abc123', {
          allowNumber: true,
        })
      ).toBe(true);
    });

    it('should return true when the string does not contain a number and allowNumber is false', () => {
      expect(
        TextValueObject.isAllowToContainsNumbers('abc', { allowNumber: false })
      ).toBe(true);
    });

    it('should return true when the string does not contain a number and allowNumber is true', () => {
      expect(
        TextValueObject.isAllowToContainsNumbers('abc', { allowNumber: true })
      ).toBe(true);
    });
  });

  describe('isMatchingRegex()', () => {
    it('should return true when the string matches the provided regex', () => {
      expect(
        TextValueObject.isMatchingRegex('abc123', {
          regex: /^[a-zA-Z0-9]+$/,
        })
      ).toBe(true);
    });

    it('should return false when the string does not match the provided regex', () => {
      expect(
        TextValueObject.isMatchingRegex('abc 123', {
          regex: /^[a-zA-Z0-9]+$/,
        })
      ).toBe(false);
    });

    it('should return true when the regex is not provided', () => {
      expect(
        TextValueObject.isMatchingRegex(
          'abc123',
          {} as unknown as IsMatchingRegexOptions
        )
      ).toBe(true);
    });
  });

  describe('TextValueObject', () => {
    describe('isValueIncludedInAllowedValues', () => {
      it('should return true if the value is included in the allowedValues', () => {
        const value = 'blue';
        const options = {
          allowedValues: ['red', 'green', 'blue'],
        };

        const result = TextValueObject.isValueIncludedInAllowedValues(
          value,
          options
        );
        expect(result).toBe(true);
      });

      it('should return false if the value is not included in the allowedValues', () => {
        const value = 'purple';
        const options = {
          allowedValues: ['red', 'green', 'blue'],
        };

        const result = TextValueObject.isValueIncludedInAllowedValues(
          value,
          options
        );
        expect(result).toBe(false);
      });

      it('should return true if the allowedValues is not provided', () => {
        const value = 'yellow';
        const options = {} as unknown as IsValueIncludedInAllowedValuesOptions;

        const result = TextValueObject.isValueIncludedInAllowedValues(
          value,
          options
        );
        expect(result).toBe(true);
      });
    });
  });

  describe('constructor', () => {
    it('should create a new instance of TextValueObject with valid input', () => {
      const textValueObject = new TextValueObject('validValue');

      expect(textValueObject.unpack()).toEqual('validValue');
      expect(textValueObject.getOptions()).toEqual(
        TextValueObject.DEFAULT_OPTIONS
      );
    });

    it('should throw MultipleArgumentException with invalid input', () => {
      const invalidValue = 'Invalid@123';
      const invalidOptions = {
        allowUppercase: false,
        allowSymbols: false,
      };

      try {
        new TextValueObject(invalidValue, invalidOptions);
      } catch (e) {
        expect(e).toBeInstanceOf(MultipleExceptions);

        const typedException = e as MultipleExceptions;
        expect(typedException.exceptions).toEqual(
          expect.arrayContaining([new ArgumentContainsSymbolException()])
        );
      }
    });
  });
});
