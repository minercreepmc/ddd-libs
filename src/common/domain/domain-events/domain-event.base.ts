import { DateVO, ID, UUID } from '@domain/value-objects';
import { GuardUtils } from '@utils/guard';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export interface DomainEventOptions<DomainEventDetails> {
  eventDetails: DomainEventDetails;
  entityId: ID;
  entityType: string;
  eventName: string;
}

export class DomainEvent<DomainEventDetails> {
  readonly eventId: ID;
  readonly dateOccurred: DateVO;
  readonly details: DomainEventDetails;
  readonly entityId: ID;
  readonly entityType: string;
  readonly eventName: string;

  constructor(options: DomainEventOptions<DomainEventDetails>) {
    DomainEvent.isValidEventOptions(options);
    const { eventName, entityId, entityType, eventDetails } = options;
    this.eventId = UUID.create();
    this.dateOccurred = DateVO.now();
    this.entityId = entityId;
    this.entityType = entityType;
    this.eventName = eventName;
    this.details = eventDetails;
  }

  static isValidEventOptions(candidate: unknown) {
    if (
      GuardUtils.isNullOrUndefined(candidate) ||
      GuardUtils.isEmptyString(candidate) ||
      GuardUtils.isEmptyObject(candidate) ||
      (typeof candidate === 'object' && GuardUtils.isEmptyObject(candidate)) ||
      GuardUtils.isEmptyArray(candidate) ||
      Array.isArray(candidate)
    ) {
      throw new ArgumentInvalidException('eventOptions cannot be empty');
    }
  }
}
