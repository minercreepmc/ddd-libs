import { DomainEvent, DomainEventClass } from '.';
import { DomainEventPublisher } from '.';

export type DomainEventHandlerClass = new (arg: any) => DomainEventHandler;

export abstract class DomainEventHandler {
  constructor(private readonly event: DomainEventClass) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEventPublisher.subscribe(this.event, this);
  }
}
