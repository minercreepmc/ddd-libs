import { DateVO, ID, UUID } from '@domain/value-objects';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export interface DomainEventData<DomainEventDetails> {
  eventId?: ID;
  dateOccurred?: DateVO;
  entityId: ID;
  entityType: string;
  eventName: string;
  details: DomainEventDetails;
}

export class DomainEvent<DomainEventDetails> {
  readonly eventId: ID;
  readonly dateOccurred: DateVO;
  readonly details: DomainEventDetails;
  readonly entityId: ID;
  readonly entityType: string;
  readonly eventName: string;

  constructor(eventData: DomainEventData<DomainEventDetails>) {
    this.eventId = eventData.eventId || UUID.create();
    this.dateOccurred = eventData.dateOccurred || DateVO.now();
    this.entityId = eventData.entityId;
    this.entityType = eventData.entityType;
    this.eventName = eventData.eventName;
    this.details = eventData.details;
  }
}
