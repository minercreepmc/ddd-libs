import { DomainEvent } from '@domain/domain-events';
import { ID } from '@domain/value-objects';
import { AbstractAggregateRoot } from './aggregate-root.base';

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
      const domainEvent = new DomainEvent({
        entity: testAggregateRoot,
        eventName: 'testEvent',
      });

      testAggregateRoot.addEvent(domainEvent);

      expect(testAggregateRoot.domainEvents).toContain(domainEvent);
    });
  });
});
