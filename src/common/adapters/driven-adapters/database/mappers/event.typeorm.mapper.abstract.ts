import { DomainEvent } from '@domain/domain-events';
import { EventTypeOrmModel } from '../models';
import {
  PersistentMapper,
  TypeOrmModelConstructor,
  EventConstructorDocuments,
  EventConstructor,
} from '@utils/patterns/mapper';
import { DateVO, UUID } from '@domain/value-objects';

export abstract class AbstractEventTypeOrmMapper<
  Event extends DomainEvent<any>,
  EventDetails,
  EventOrmModel extends EventTypeOrmModel<EventOrmModelDetails>,
  EventOrmModelDetails
> implements PersistentMapper<Event, EventOrmModel>
{
  constructor(
    //private readonly eventConstructor: EventConstructor<Event>,
    private readonly typeOrmModelConstructor: TypeOrmModelConstructor<EventOrmModel>
  ) {}

  protected abstract toDomainDetails(
    details: EventOrmModelDetails
  ): EventDetails;
  protected abstract toPersistanceDetails(event: EventDetails): object;
  protected abstract toPersistentIndexColumns(event: Event): object;
  protected abstract eventConstructorDocuments: EventConstructorDocuments<
    string,
    EventConstructor<Event>
  >;

  toPersistent(event: Event): EventOrmModel {
    const details = this.toPersistanceDetails(event.details);
    const childColumn = this.toPersistentIndexColumns(event);
    return new this.typeOrmModelConstructor({
      eventId: event.eventId.unpack(),
      entityId: event.entityId.unpack(),
      dateOccurred: event.dateOccurred.unpack(),
      eventName: event.eventName,
      entityType: event.entityType,
      eventData: details,
      ...childColumn,
    });
  }

  toDomain(persistentObject: EventOrmModel): Event {
    const eventId = UUID.create(persistentObject.eventId);
    const entityId = UUID.create(persistentObject.entityId);
    const dateOccurred = DateVO.create(persistentObject.dateOccurred);
    const details = this.toDomainDetails(persistentObject.eventData);
    const eventName = persistentObject.eventName;
    const aggregateType = persistentObject.entityType;
    const eventConstructor = this.eventConstructorDocuments[eventName];
    return new eventConstructor({
      details,
      eventId,
      eventName,
      aggregateType,
      aggregateId: entityId,
      dateOccurred,
    });
  }
}
