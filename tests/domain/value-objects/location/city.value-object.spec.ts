import { CityValueObject } from '@domain/value-objects';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('CityValueObject', () => {
  describe('isValidFormat', () => {
    it('should return true for valid city names', () => {
      const validCities = [
        'Hồ Chí Minh',
        'Đà Nẵng',
        'Thành phố Hải Phòng',
        'Bà Rịa - Vũng Tàu',
      ];
      validCities.forEach((city) => {
        expect(CityValueObject.isValidFormat(city)).toBe(true);
      });
    });

    it('should return false for invalid city names', () => {
      const invalidCities = [
        '123',
        '$%^',
        'Hanoi-',
        '-Hanoi',
        'Hanoi\nCity',
        'H@noi',
      ];
      invalidCities.forEach((city) => {
        expect(CityValueObject.isValidFormat(city)).toBe(false);
      });
    });
  });

  describe('constructor', () => {
    it('should create a new instance with valid city name', () => {
      const city = 'Hồ Chí Minh';
      const cityValueObject = new CityValueObject(city);
      expect(cityValueObject).toBeInstanceOf(CityValueObject);
      expect(cityValueObject.unpack()).toEqual(city);
    });

    it('should throw an exception with invalid city name', () => {
      const invalidCity = '123';
      expect(() => new CityValueObject(invalidCity)).toThrow(
        ArgumentInvalidException
      );
    });
  });
});
