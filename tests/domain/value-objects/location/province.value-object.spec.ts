import { ProvinceValueObject } from '@domain/value-objects/location';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('ProvinceValueObject', () => {
  describe('constructor', () => {
    it('should create an instance with valid format', () => {
      const province = 'Hồ Chí Minh';
      const provinceValueObject = new ProvinceValueObject(province);
      expect(provinceValueObject.unpack()).toBe(province);
    });

    it('should throw an exception if the province is not in a valid format', () => {
      const province = 'HCMC 123';
      expect(() => new ProvinceValueObject(province)).toThrow(
        ArgumentInvalidException
      );
    });
  });

  describe('isValidFormat', () => {
    it('should return true for valid format', () => {
      const province = 'Hà Nội';
      expect(ProvinceValueObject.isValidFormat(province)).toBe(true);
    });

    it('should return false for invalid format', () => {
      const province = 'Da Nang 123';
      expect(ProvinceValueObject.isValidFormat(province)).toBe(false);
    });
  });
});
