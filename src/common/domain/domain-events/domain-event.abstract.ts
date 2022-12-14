import { DateVO, ID, UUID } from '@domain/value-objects';
import { GenericObject } from 'src/types/object.type';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export type DomainEventDetails = GenericObject;

export abstract class DomainEvent<AggregateClassType> {
  readonly eventId: ID;
  readonly aggregateId: ID;
  readonly dateOccurred: DateVO;
  readonly eventName: string;
  readonly aggregateType: AggregateClassType;
  abstract readonly details: DomainEventDetails;

  constructor(
    aggregateId: ID,
    aggregateType: AggregateClassType,
    eventName: string
  ) {
    this.eventId = UUID.create();
    this.dateOccurred = DateVO.now();
    this.aggregateId = aggregateId;
    this.eventName = eventName;
    this.aggregateType = aggregateType;
  }
}
