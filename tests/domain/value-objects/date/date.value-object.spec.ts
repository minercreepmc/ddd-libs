import { DateVO } from '@domain/value-objects/date';
import { ArgumentInvalidException } from 'ts-common-exceptions';

describe('DateVO', () => {
  describe('create', () => {
    it('should create a valid DateVO with a date string', () => {
      const dateString = '2022-01-01';
      const dateVo = DateVO.create(dateString);
      expect(dateVo).toBeInstanceOf(DateVO);
    });

    it('should create a valid DateVO with a number', () => {
      const timestamp = 1609459200000;
      const dateVo = DateVO.create(timestamp);
      expect(dateVo).toBeInstanceOf(DateVO);
    });

    it('should create a valid DateVO with a Date instance', () => {
      const date = new Date();
      const dateVo = DateVO.create(date);
      expect(dateVo).toBeInstanceOf(DateVO);
    });
    it('should throw an ArgumentInvalidException with an invalid date string', () => {
      const dateString = 'invalid date string';
      expect(() => DateVO.create(dateString)).toThrow(ArgumentInvalidException);
    });
  });
  describe('isValid', () => {
    it('should return true for a valid date string', () => {
      const dateString = '2022-01-01';
      const result = DateVO.isValid(dateString);
      expect(result).toBe(true);
    });

    it('should return true for a valid timestamp', () => {
      const timestamp = 1609459200000;
      const result = DateVO.isValid(timestamp);
      expect(result).toBe(true);
    });
    it('should return true for a valid Date instance', () => {
      const date = new Date();
      const result = DateVO.isValid(date);
      expect(result).toBe(true);
    });

    it('should return false for an invalid date string', () => {
      const dateString = 'invalid date string';
      const result = DateVO.isValid(dateString);
      expect(result).toBe(false);
    });
  });
  describe('now', () => {
    it('should return a valid DateVO instance', () => {
      const dateVo = DateVO.now();
      expect(dateVo).toBeInstanceOf(DateVO);
    });
  });
});
