import { Result } from 'oxide.ts';
import { UUID } from './uuid.value-object';

describe('uuid value object', () => {
  it('should create a valid uuid', () => {
    const uuidResult: Result<UUID, Error> = Result.safe(UUID.create);
    expect(uuidResult.isOk()).toBe(true);

    if (uuidResult.isOk()) {
      const uuid = uuidResult.into();
      expect(UUID.isValid(uuid.value)).toBe(true);
    }
  });
});
