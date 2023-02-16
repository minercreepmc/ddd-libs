import { DateVO, ID, UUID } from '@domain/value-objects';
import { GuardUtils } from '@utils/guard';
import { ArgumentInvalidException } from 'ts-common-exceptions';

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
    DomainEvent.isValidEventData(eventData);
    this.eventId = eventData.eventId || UUID.create();
    this.dateOccurred = eventData.dateOccurred || DateVO.now();
    this.entityId = eventData.entityId;
    this.entityType = eventData.entityType;
    this.eventName = eventData.eventName;
    this.details = eventData.details;
  }

  static isValidEventData(candidate: unknown) {
    if (
      GuardUtils.isNullOrUndefined(candidate) ||
      GuardUtils.isEmptyString(candidate) ||
      GuardUtils.isEmptyObject(candidate) ||
      (typeof candidate === 'object' && GuardUtils.isEmptyObject(candidate)) ||
      GuardUtils.isEmptyArray(candidate) ||
      Array.isArray(candidate)
    ) {
      throw new ArgumentInvalidException('eventData cannot be empty');
    }
  }
}
