import { DateVO, ID, UUID } from '@domain/value-objects';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export interface DomainEventProps<DomainEventDetails> {
  eventId?: ID;
  dateOccurred?: DateVO;
  aggregateId: ID;
  aggregateType: string;
  eventName: string;
  details: DomainEventDetails;
}

export class DomainEvent<DomainEventDetails> {
  readonly eventId: ID;
  readonly dateOccurred: DateVO;
  readonly details: DomainEventDetails;
  readonly aggregateId: ID;
  readonly aggregateType: string;
  readonly eventName: string;

  constructor(eventProps: DomainEventProps<DomainEventDetails>) {
    this.eventId = eventProps.eventId || UUID.create();
    this.dateOccurred = eventProps.dateOccurred || DateVO.now();
    this.aggregateId = eventProps.aggregateId;
    this.aggregateType = eventProps.aggregateType;
    this.eventName = eventProps.eventName;
    this.details = eventProps.details;
  }
}
