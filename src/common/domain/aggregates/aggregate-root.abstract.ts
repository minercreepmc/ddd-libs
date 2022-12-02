import { DomainEvent } from '@domain/domain-events/domain-event.abstract';
import { AbstractEntity } from '../entities';

export type AggregateType<A> = new (args: any) => AbstractAggregateRoot<A>;

export abstract class AbstractAggregateRoot<
  EntityDetails
> extends AbstractEntity<EntityDetails> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  clearEvent(): void {
    this._domainEvents = [];
  }
}
