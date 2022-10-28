import { DomainEvent, DomainEventClass } from '.';
import { EventEmitter } from './event-emitter';

export type DomainEventHandlerClass = new (arg: any) => DomainEventHandler;

export abstract class DomainEventHandler {
  constructor(private readonly event: DomainEventClass) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    EventEmitter.subscribe(this.event, this);
  }
}
