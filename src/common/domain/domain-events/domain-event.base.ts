import { DateVO, ID, UUID } from '@domain/value-objects';
import { GuardUtils } from '@utils/guard';
import { ArgumentInvalidException } from 'ts-common-exceptions';
import { AbstractEntity } from '../entities';

export type DomainEventClass<T> = new (args: any) => DomainEvent<T>;
export interface DomainEventOptions {
  entity: AbstractEntity<any>;
  eventName: string;
}

export class DomainEvent<DomainEventDetails> {
  readonly eventId: ID;
  readonly dateOccurred: DateVO;
  readonly details: DomainEventDetails;
  readonly entityId: ID;
  readonly entityType: string;
  readonly eventName: string;

  constructor(options: DomainEventOptions) {
    DomainEvent.isValidEventOptions(options);
    const { entity, eventName } = options;
    this.eventId = UUID.create();
    this.dateOccurred = DateVO.now();
    this.entityId = entity.id;
    this.entityType = entity.constructor.name;
    this.eventName = eventName;
    this.details = entity.details;
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
