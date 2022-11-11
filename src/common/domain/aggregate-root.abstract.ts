import { DomainEvent } from '@domain/domain-events/domain-event.abstract';
import { Entity } from '.';

export type AggregateType<A> = new (args: any) => AggregateRoot<A>;

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
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
