import { DomainEvent, DomainEventClass } from './domain-event.abstract';
import { DomainEventPublisher } from './implementation';

export type DomainEventHandlerClass = new (arg: any) => DomainEventHandler;

export abstract class DomainEventHandler {
  constructor(private readonly event: DomainEventClass) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEventPublisher.subscribe(this.event, this);
  }
}
