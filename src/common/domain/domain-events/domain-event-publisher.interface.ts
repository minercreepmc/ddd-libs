import { AggregateType, ID } from '..';
import { DomainEvent } from './domain-event.abstract';

export interface IDomainEventPublisher {
  publish(
    aggregateType: AggregateType<any>,
    aggregateId: ID,
    domainEvents: DomainEvent[]
  ): void;
}
