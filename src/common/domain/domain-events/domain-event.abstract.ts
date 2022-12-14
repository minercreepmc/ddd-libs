import { DateVO, ID, UUID } from '@domain/value-objects';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;

export abstract class DomainEvent<DomainEventDetails> {
  readonly eventId: ID;
  readonly dateOccurred: DateVO;
  abstract readonly details: DomainEventDetails;

  constructor(
    readonly aggregateId: ID,
    readonly aggregateType: string,
    readonly eventName: string
  ) {
    this.eventId = UUID.create();
    this.dateOccurred = DateVO.now();
  }
}
