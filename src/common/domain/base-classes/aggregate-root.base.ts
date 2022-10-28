import { DomainEvent } from '../events';
import { EventEmitter } from '../events/event-emitter';
import { Entity } from './entity.base';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    EventEmitter.prepareForPublish(this);
  }

  clearEvent(): void {
    this._domainEvents = [];
  }
}
