import { ID } from '../value-objects/id';
import { AbstractEntity } from './entity.abstract';

class TestEntity extends AbstractEntity<{ name: string }> {}

describe('AbstractEntity', () => {
  let testEntity: TestEntity;
  let anotherTestEntity: TestEntity;

  beforeEach(() => {
    testEntity = new TestEntity({
      id: new ID('test-id'),
      details: { name: 'test' },
    });

    anotherTestEntity = new TestEntity({
      id: new ID('another-test-id'),
      details: { name: 'another-test' },
    });
  });

  describe('equals', () => {
    it('returns true for the same entity', () => {
      expect(testEntity.equals(testEntity)).toBe(true);
    });

    it('returns false for different entities', () => {
      expect(testEntity.equals(anotherTestEntity)).toBe(false);
    });

    it('returns false for objects that are not entities', () => {
      expect(testEntity.equals({})).toBe(false);
    });

    it('returns false for undefined objects', () => {
      expect(testEntity.equals(undefined)).toBe(false);
    });

    it('returns false for null objects', () => {
      expect(testEntity.equals(null)).toBe(false);
    });
  });
  describe('isEntity', () => {
    it('returns true for entities', () => {
      expect(AbstractEntity.isEntity(testEntity)).toBe(true);
    });

    it('returns false for objects that are not entities', () => {
      expect(AbstractEntity.isEntity({})).toBe(false);
    });
    it('returns false for non-entities', () => {
      expect(AbstractEntity.isEntity({})).toBe(false);
      expect(AbstractEntity.isEntity(123)).toBe(false);
      expect(AbstractEntity.isEntity('abc')).toBe(false);
      expect(AbstractEntity.isEntity(null)).toBe(false);
      expect(AbstractEntity.isEntity(undefined)).toBe(false);
    });
  });

  describe('getDetailsCopy', () => {
    it('returns a copy of the entity details', () => {
      const detailsCopy = testEntity.getDetailsCopy();
      expect(detailsCopy).toEqual({ name: 'test' });
      expect(detailsCopy).not.toBe(testEntity.details);
    });
  });

  describe('toObject', () => {
    it('returns a frozen object representation of the entity', () => {
      const object = testEntity.toObject();
      expect(object).toEqual({
        id: new ID('test-id'),
        createdAt: testEntity.createdAt,
        updatedAt: testEntity.updatedAt,
        name: 'test',
      });
      expect(() => {
        object.id = new ID('another-test-id');
      }).toThrow();
    });
  });
});
