import { DateVO, ID, UUID } from '@domain/value-objects';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export interface DomainEventProps {
  aggregateId: ID;
  aggregateType: string;
  eventName: string;
}

export abstract class DomainEvent<DomainEventDetails> {
  readonly eventId: ID;
  readonly dateOccurred: DateVO;
  abstract readonly details: DomainEventDetails;
  readonly aggregateId: ID;
  readonly aggregateType: string;
  readonly eventName: string;

  constructor(eventProps: DomainEventProps) {
    this.eventId = UUID.create();
    this.dateOccurred = DateVO.now();
    this.aggregateId = eventProps.aggregateId;
    this.aggregateType = eventProps.aggregateType;
    this.eventName = eventProps.eventName;
  }
}
