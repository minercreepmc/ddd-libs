import { AbstractValueObject } from './value-object.abstract';

describe('ValueObjectAbstract', () => {
  class ConcreteValueObject extends AbstractValueObject<string> {
    constructor(value: string) {
      super({ value });
    }
  }
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
    it('should return the internal value if it is a domain primitive', () => {
      const valueObject = new ConcreteValueObject('value');
      expect(valueObject.unpack()).toBe('value');
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
