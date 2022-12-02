import { ID, UUID } from '@domain/value-objects';

export type DomainEventClass = new (args: any) => DomainEvent;

export abstract class DomainEvent {
  public readonly eventId: string;
  public readonly aggregateId: string;
  public readonly dateOccurred: number | Date;
  constructor(aggregateId: ID) {
    this.eventId = UUID.create().unpack();
    this.aggregateId = aggregateId.unpack();
    this.dateOccurred = Date.now();
  }
}
