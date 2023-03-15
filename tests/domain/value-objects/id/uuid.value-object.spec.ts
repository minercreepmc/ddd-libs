import { UUID } from '@domain/value-objects/id';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('UUID class', () => {
  it('create should return a valid UUID instance', () => {
    const uuid = UUID.create();
    expect(uuid).toBeInstanceOf(UUID);
    expect(UUID.isValid(uuid)).toBe(true);
  });

  it('create should throw an ArgumentInvalidException if an invalid uuid is provided', () => {
    const invalidUuid = 'invalid-uuid';
    expect(() => UUID.create(invalidUuid)).toThrow(ArgumentInvalidException);
  });

  it('isValid should return true if the candidate is valid uuid', () => {
    const validUuid = '9e12f120-e72b-4517-ad10-e16b2acb5d1e';
    expect(UUID.isValid(validUuid)).toBe(true);
  });

  it('isValid should return false if the candidate is invalid uuid', () => {
    const invalidUuid = 'invalid-uuid';
    expect(UUID.isValid(invalidUuid)).toBe(false);
  });
});
