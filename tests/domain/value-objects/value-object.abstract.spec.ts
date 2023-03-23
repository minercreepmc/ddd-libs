import { AbstractValueObject } from '@domain/value-objects';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('ValueObjectAbstract', () => {
  class ConcreteValueObject extends AbstractValueObject<string> {
    constructor(value: string) {
      super({ value });
    }
  }

  class ConcreteValueObject2 extends AbstractValueObject<object> {
    constructor(details: object) {
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
      const a = new ConcreteValueObject('test');
      const b = new ConcreteValueObject('test');

      expect(a.equals(b)).toBe(true);
    });

    it('should be able to compare two non-equal value objects', () => {
      const a = new ConcreteValueObject('test');
      const b = new ConcreteValueObject('not test');

      expect(a.equals(b)).toBe(false);
    });
  });
  describe('unpack', () => {
    it('should return the underlying value if the details are a domain primitive', () => {
      const vo = new ConcreteValueObject2({ value: 'abc' });
      expect(vo.unpack()).toBe('abc');
    });

    it('should return a plain object with any nested value objects unpacked', () => {
      const vo = new ConcreteValueObject2({
        prop1: new ConcreteValueObject('abc'),
        prop2: [{ prop3: new ConcreteValueObject('def') }],
      });
      expect(vo.unpack()).toEqual({
        prop1: 'abc',
        prop2: [{ prop3: 'def' }],
      });
    });
    it('should return the correct type for nested value objects', () => {
      interface ConcreteValueObject3Details {
        prop1: ConcreteValueObject;
        prop2: [{ prop3: ConcreteValueObject }];
      }
      class ConcreteValueObject3 extends AbstractValueObject<ConcreteValueObject3Details> {
        constructor(details: ConcreteValueObject3Details) {
          super(details);
        }
      }
      const vo = new ConcreteValueObject3({
        prop1: new ConcreteValueObject('abc'),
        prop2: [{ prop3: new ConcreteValueObject('def') }],
      });

      const unpacked = vo.unpack();
      // Here we can use TypeScript's type assertion to check the type of `unpacked.prop1`
      expect(unpacked.prop1).toBe('abc');
      expect(unpacked.prop2).toStrictEqual([{ prop3: 'def' }]);
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
