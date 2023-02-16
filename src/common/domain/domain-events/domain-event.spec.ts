import { DateVO, ID, UUID } from '@domain/value-objects';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import { DomainEvent, DomainEventData } from './domain-event.abstract';

describe('DomainEvent', () => {
  describe('isValidEventData', () => {
    it('should throw an exception if eventData is empty', () => {
      const eventData: DomainEventData<unknown> = {} as any;
      expect(() => {
        DomainEvent.isValidEventData(eventData);
      }).toThrow(ArgumentInvalidException);
    });

    it('should not throw an exception if eventData is not empty', () => {
      const eventData: DomainEventData<unknown> = {
        entityId: new ID('123'),
        entityType: 'TestEntity',
        eventName: 'TestEvent',
        details: { foo: 'bar' },
      };
      expect(() => {
        DomainEvent.isValidEventData(eventData);
      }).not.toThrow();
    });
  });
  it('should set eventId to provided eventId or generate a new UUID', () => {
    const eventId = new ID('123');
    const domainEventData: DomainEventData<any> = {
      eventId,
      entityId: new ID('456'),
      entityType: 'test',
      eventName: 'testEvent',
      details: {},
    };

    const domainEvent = new DomainEvent(domainEventData);
    expect(domainEvent.eventId).toBe(eventId);

    const domainEventData2: DomainEventData<any> = {
      entityId: new ID('456'),
      entityType: 'test',
      eventName: 'testEvent',
      details: {},
    };
    const domainEvent2 = new DomainEvent(domainEventData2);

    expect(UUID.isValid(domainEvent2.eventId)).toBe(true);
  });
  it('should set dateOccurred to the provided dateOccurred or the current date', () => {
    const dateOccurred = DateVO.create(new Date(2020, 1, 1));
    const domainEventData: DomainEventData<any> = {
      eventId: new ID('123'),
      entityId: new ID('456'),
      entityType: 'test',
      eventName: 'testEvent',
      dateOccurred,
      details: {},
    };
    const domainEvent = new DomainEvent(domainEventData);
    expect(domainEvent.dateOccurred).toBe(dateOccurred);

    const domainEventData2: DomainEventData<any> = {
      eventId: new ID('123'),
      entityId: new ID('456'),
      entityType: 'test',
      eventName: 'testEvent',
      details: {},
    };
    const domainEvent2 = new DomainEvent(domainEventData2);
    expect(domainEvent2.dateOccurred.equals(DateVO.now())).toBe(true);
  });
  it('should set entityId, entityType, eventName, and details based on provided eventData', () => {
    const entityId = new ID('456');
    const entityType = 'test';
    const eventName = 'testEvent';
    const details = {};
    const domainEventData: DomainEventData<any> = {
      eventId: new ID('123'),
      entityId,
      entityType,
      eventName,
      details,
    };
    const domainEvent = new DomainEvent(domainEventData);
    expect(domainEvent.entityId).toBe(entityId);
    expect(domainEvent.entityType).toBe(entityType);
    expect(domainEvent.eventName).toBe(eventName);
    expect(domainEvent.details).toBe(details);
  });
});
