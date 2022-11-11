import { AggregateType, ID, DomainEvent } from '..';

export interface IDomainEventPublisher {
  publish(
    aggregateType: AggregateType<any>,
    aggregateId: ID,
    domainEvents: DomainEvent[]
  ): void;
}
