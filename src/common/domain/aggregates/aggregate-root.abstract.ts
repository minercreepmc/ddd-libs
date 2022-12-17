import { DomainEvent } from '@domain/domain-events/domain-event.abstract';
import { AbstractEntity } from '../entities';

export type AggregateType<A> = new (args: any) => AbstractAggregateRoot<A>;

export abstract class AbstractAggregateRoot<
  EntityDetails
> extends AbstractEntity<EntityDetails> {
  readonly domainEvents: DomainEvent<any>[] = [];

  protected addEvent(domainEvent: DomainEvent<any>): void {
    this.domainEvents.push(domainEvent);
  }
}
