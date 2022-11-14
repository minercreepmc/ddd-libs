import { AggregateType, AggregateRoot, ID } from '..';
import { DomainEvent } from './domain-event.abstract';
import { IDomainEventPublisher } from './domain-event-publisher.interface';

export abstract class AbstractAggregateDomainEventPublisher<
  Aggregate extends AggregateRoot<any>,
  Event extends DomainEvent
> {
  protected constructor(
    private readonly eventPublisher: IDomainEventPublisher,
    private readonly aggregateType: AggregateType<Aggregate>,
    private readonly idSupplier: (aggregate: Aggregate) => ID
  ) {}

  publish(aggregate: Aggregate, events: Event[]): void {
    this.eventPublisher.publish(
      this.aggregateType,
      this.idSupplier(aggregate),
      events
    );
  }
}
