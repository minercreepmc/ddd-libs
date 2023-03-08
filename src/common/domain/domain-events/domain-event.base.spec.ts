import { DateVO, ID } from '@domain/value-objects';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractEntity } from '..';
import { DomainEvent, DomainEventOptions } from './domain-event.base';

describe('DomainEvent', () => {
  class CustomEntity extends AbstractEntity<any> {}
  let validEntity: CustomEntity;

  beforeEach(() => {
    validEntity = new CustomEntity({
      id: new ID('123'),
      details: {},
    });
  });

  describe('isValidEventOptions', () => {
    it('should throw an exception if eventOptions is empty', () => {
      const eventOptions: DomainEventOptions = {} as any;
      expect(() => {
        DomainEvent.isValidEventOptions(eventOptions);
      }).toThrow(ArgumentInvalidException);
    });

    it('should not throw an exception if eventOptions is not empty', () => {
      const eventOptions: DomainEventOptions = {
        entity: validEntity,
        eventName: 'eventName',
      };
      expect(() => {
        DomainEvent.isValidEventOptions(eventOptions);
      }).not.toThrow();
    });
  });
  it('should set dateOccurred to the current date', () => {
    const domainEventOptions: DomainEventOptions = {
      entity: validEntity,
      eventName: 'eventName',
    };
    const domainEvent = new DomainEvent(domainEventOptions);
    expect(domainEvent.dateOccurred.equals(DateVO.now())).toBe(true);
  });
  it('should set eventName based on provided eventOptions', () => {
    const eventName = 'testEvent';
    const domainEventOptions: DomainEventOptions = {
      entity: validEntity,
      eventName: 'testEvent',
    };
    const domainEvent = new DomainEvent(domainEventOptions);
    expect(domainEvent.eventName).toBe(eventName);
  });
});
