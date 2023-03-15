import {
  CordinatesDetails,
  CordinatesValueObject,
  LatitudeValueObject,
  LongitudeValueObject,
} from '@domain/value-objects';

describe('CordinatesValueObject', () => {
  describe('constructor', () => {
    it('should create an instance with valid cordinates', () => {
      const latitude = new LatitudeValueObject(10);
      const longitude = new LongitudeValueObject(20);
      const cordinates = { latitude, longitude };

      const cordinatesValueObject = new CordinatesValueObject(cordinates);

      expect(cordinatesValueObject.latitude.equals(latitude)).toBe(true);
      expect(cordinatesValueObject.longitude.equals(longitude)).toBe(true);
    });
    it('should throw an exception for invalid coordinates', () => {
      expect(
        () =>
          new CordinatesValueObject({
            latitude: new LatitudeValueObject(91),
            longitude: new LongitudeValueObject(-181),
          })
      ).toThrow(Error);

      expect(
        () =>
          new CordinatesValueObject({
            latitude: new LatitudeValueObject(-91),
            longitude: new LongitudeValueObject(181),
          })
      ).toThrow(Error);

      expect(
        () =>
          new CordinatesValueObject({
            latitude: new LatitudeValueObject('invalid' as unknown as number),
            longitude: new LongitudeValueObject(-180),
          })
      ).toThrow(Error);
    });
  });

  describe('isValidFormat', () => {
    it('should return true for valid cordinates', () => {
      const invalidLatitude = new LatitudeValueObject(90);
      const invalidLongitude = new LongitudeValueObject(180);
      const cordinates: CordinatesDetails = {
        latitude: invalidLatitude,
        longitude: invalidLongitude,
      };

      expect(CordinatesValueObject.isValidFormat(cordinates)).toBe(true);
    });

    it('should return false for invalid cordinates', () => {
      const latitude = 'someshittything' as unknown as LatitudeValueObject;
      const longitude =
        'anothershittysthing' as unknown as LongitudeValueObject;
      const cordinates: CordinatesDetails = { latitude, longitude };

      expect(CordinatesValueObject.isValidFormat(cordinates)).toBe(false);
    });
  });
});
