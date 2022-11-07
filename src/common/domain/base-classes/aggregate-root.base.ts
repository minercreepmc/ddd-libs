import { IDomainEvent } from '../events';
import { EventEmitter } from '../events/event-emitter';
import { Entity } from '.';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: IDomainEvent[] = [];

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    EventEmitter.prepareForPublish(this);
  }

  clearEvent(): void {
    this._domainEvents = [];
  }
}
