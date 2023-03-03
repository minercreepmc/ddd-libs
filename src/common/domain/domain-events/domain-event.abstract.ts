import { DateVO, ID, UUID } from '@domain/value-objects';
import { GuardUtils } from '@utils/guard';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export interface DomainEventOptions<DomainEventDetails> {
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

  constructor(eventOptions: DomainEventOptions<DomainEventDetails>) {
    DomainEvent.isValidEventOptions(eventOptions);
    this.eventId = eventOptions.eventId || UUID.create();
    this.dateOccurred = eventOptions.dateOccurred || DateVO.now();
    this.entityId = eventOptions.entityId;
    this.entityType = eventOptions.entityType;
    this.eventName = eventOptions.eventName;
    this.details = eventOptions.details;
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
