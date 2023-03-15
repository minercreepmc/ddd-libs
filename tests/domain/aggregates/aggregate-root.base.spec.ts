import { AbstractAggregateRoot } from '@domain/aggregates';
import { DomainEvent } from '@domain/domain-events';
import { ID } from '@domain/value-objects';

class TestAggregateRoot extends AbstractAggregateRoot<object> {}

describe('AbstractAggregateRoot', () => {
  let testAggregateRoot: AbstractAggregateRoot<object>;
  beforeEach(() => {
    testAggregateRoot = new TestAggregateRoot({
      id: new ID('1'),
      details: {},
    });
  });

  describe('constructor', () => {
    it('should create an instance of AbstractAggregateRoot', () => {
      expect(testAggregateRoot).toBeInstanceOf(AbstractAggregateRoot);
    });

    it('should have an empty `domainEvents` array', () => {
      expect(testAggregateRoot.domainEvents).toEqual([]);
    });
  });

  describe('addEvent', () => {
    it('should add a domain event to the `domainEvents` array', () => {
      const eventDetails = {};
      const domainEvent = new DomainEvent({
        entityType: testAggregateRoot.constructor.name,
        eventDetails,
        entityId: testAggregateRoot.id,
        eventName: 'TestEvent',
      });

      testAggregateRoot.addEvent(domainEvent);

      expect(testAggregateRoot.domainEvents).toContain(domainEvent);
    });
  });
});
