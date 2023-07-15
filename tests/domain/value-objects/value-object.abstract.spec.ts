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

  interface DeepNestedValueObjectDetails {
    prop1: {
      prop2: {
        prop3: SimpleValueObject;
      };
    };
  }
  class DeepNestedValueObject extends AbstractValueObject<DeepNestedValueObjectDetails> {
    constructor(details: DeepNestedValueObjectDetails) {
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
    it('should return plain object with super nested value object', () => {
      const vo = new DeepNestedValueObject({
        prop1: {
          prop2: {
            prop3: new SimpleValueObject('abc'),
          },
        },
      });
      expect(vo.unpack()).toEqual({
        prop1: {
          prop2: {
            prop3: 'abc',
          },
        },
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
  describe('includes', () => {
    it('should return true if all given values exist in the value objects', () => {
      const valueObjects = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];
      const values = [new SimpleValueObject('a'), new SimpleValueObject('b')];

      expect(AbstractValueObject.includes(valueObjects, values)).toBe(true);
    });

    it('should return false if not all given values exist in the value objects', () => {
      const valueObjects = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];
      const values = [new SimpleValueObject('a'), new SimpleValueObject('d')];

      expect(AbstractValueObject.includes(valueObjects, values)).toBe(false);
    });
  });

  describe('filter', () => {
    it('should correctly filter the value objects based on the filter function', () => {
      const valueObjects = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];

      const result = AbstractValueObject.filter(
        valueObjects,
        (vo: SimpleValueObject) => vo.unpack() === 'a'
      );

      expect(result[0].unpack()).toBe('a');
    });

    it('should return an empty array if no value objects pass the filter function', () => {
      const valueObjects = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];
      const filterFn = (vo: SimpleValueObject) => vo.unpack() === 'd'; // 'd' is not present in the values
      const result = AbstractValueObject.filter(valueObjects, filterFn);

      expect(result.length).toBe(0);
    });

    it('should return the same array if all value objects pass the filter function', () => {
      const valueObjects = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];
      const filterFn = (vo: SimpleValueObject) => vo.unpack() !== 'd';

      const result = AbstractValueObject.filter(valueObjects, filterFn);

      expect(result.length).toBe(3);
      expect(result[0].unpack()).toBe('a');
      expect(result[1].unpack()).toBe('b');
      expect(result[2].unpack()).toBe('c');
    });
  });
  describe('isIncludedIn', () => {
    it('should return true if the value object is included in the array', () => {
      const a = new SimpleValueObject('a');
      const array = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];

      expect(a.isIncludedIn(array)).toBe(true);
    });

    it('should return false if the value object is not included in the array', () => {
      const d = new SimpleValueObject('d');
      const array = [
        new SimpleValueObject('a'),
        new SimpleValueObject('b'),
        new SimpleValueObject('c'),
      ];

      expect(d.isIncludedIn(array)).toBe(false);
    });
  });
});
