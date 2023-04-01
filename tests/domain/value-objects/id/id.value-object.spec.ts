import { ID } from '@domain/value-objects/id';

describe('ID', () => {
  it('should create a valid ID', () => {
    expect(() => new ID('123')).not.toThrow();
    expect(() => new ID('###')).not.toThrow();
    expect(() => new ID('abc')).not.toThrow();
  });

  it('should throw an error if the ID is invalid', () => {
    expect(() => new ID(123 as unknown as string)).toThrow();
    expect(() => new ID(null as unknown as string)).toThrow();
    expect(() => new ID(undefined as unknown as string)).toThrow();
    expect(() => new ID('')).toThrow();
    expect(() => new ID('a c')).toThrow();
    expect(() => new ID(' ')).toThrow();
    expect(() => new ID('a'.repeat(301))).toThrow();
  });
});
