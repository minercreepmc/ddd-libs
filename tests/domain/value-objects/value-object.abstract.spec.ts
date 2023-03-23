import { AbstractValueObject } from '@domain/value-objects';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('ValueObjectAbstract', () => {
  class SimpleValueObject extends AbstractValueObject<string> {
    constructor(value: string) {
      super({ value });
    }
  }

  interface ALittleComplexValueObjectDetails {
    value: string;
  }
  class ALittleComplexValueObject extends AbstractValueObject<ALittleComplexValueObjectDetails> {
    constructor(details: ALittleComplexValueObjectDetails) {
      super(details);
    }
  }

  interface ComplexValueObjectDetails {
    prop1: SimpleValueObject;
    prop2: [{ prop3: SimpleValueObject }];
  }

  class ComplexValueObject extends AbstractValueObject<ComplexValueObjectDetails> {
    constructor(details: ComplexValueObjectDetails) {
      super(details);
    }
  }
  describe('isValidOrThrow', () => {
    test('throws an error if candidate is empty', () => {
      expect(() => AbstractValueObject.isValidOrThrow(null)).toThrow(
        ArgumentInvalidException
      );
      expect(() => AbstractValueObject.isValidOrThrow(undefined)).toThrow(
        ArgumentInvalidException
      );
      expect(() => AbstractValueObject.isValidOrThrow({})).toThrow();
      expect(() => AbstractValueObject.isValidOrThrow([])).not.toThrow(
        ArgumentInvalidException
      );
      expect(() => AbstractValueObject.isValidOrThrow('')).not.toThrow(
        ArgumentInvalidException
      );
      expect(() => AbstractValueObject.isValidOrThrow('foo')).not.toThrow();
      expect(() => AbstractValueObject.isValidOrThrow(['foo'])).not.toThrow();
    });
  });
  describe('equals', () => {
    it('should be able to compare two equal value objects', () => {
      const a = new SimpleValueObject('test');
      const b = new SimpleValueObject('test');

      expect(a.equals(b)).toBe(true);
    });

    it('should be able to compare two non-equal value objects', () => {
      const a = new SimpleValueObject('test');
      const b = new SimpleValueObject('not test');

      expect(a.equals(b)).toBe(false);
    });
  });
  describe('unpack', () => {
    it('should return the underlying value if the details are a domain primitive', () => {
      const vo = new ALittleComplexValueObject({ value: 'abc' });
      expect(vo.unpack()).toBe('abc');
    });

    it('should return a plain object with any nested value objects unpacked', () => {
      const vo = new ComplexValueObject({
        prop1: new SimpleValueObject('abc'),
        prop2: [{ prop3: new SimpleValueObject('def') }],
      });
      expect(vo.unpack()).toEqual({
        prop1: 'abc',
        prop2: [{ prop3: 'def' }],
      });
    });
  });

  describe('isValueObject', () => {
    it('should return true if the object is a value object', () => {
      class ConcreteValueObject extends AbstractValueObject<string> {
        constructor(value: string) {
          super({ value });
        }
      }
      const valueObject = new ConcreteValueObject('value');
      expect(AbstractValueObject.isValueObject(valueObject)).toBe(true);
    });

    it('should return false if the object is not a value object', () => {
      class NonValueObject {}
      expect(AbstractValueObject.isValueObject(new NonValueObject())).toBe(
        false
      );
    });
  });
});
