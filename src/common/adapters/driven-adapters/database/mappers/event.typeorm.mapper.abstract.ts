import { DomainEvent } from '@domain/domain-events';
import { EventTypeOrmModel } from '../models';
import {
  EventConstructor,
  PersistentMapper,
  TypeOrmModelConstructor,
} from '@utils/patterns/mapper';
import { DateVO, UUID } from '@domain/value-objects';

export abstract class EventTypeOrmMapperAbstract<
  Event extends DomainEvent<any>,
  EventDetails,
  EventOrmModel extends EventTypeOrmModel
> implements PersistentMapper<Event, EventOrmModel>
{
  constructor(
    private readonly eventConstructor: EventConstructor<Event>,
    private readonly typeOrmModelConstructor: TypeOrmModelConstructor<EventOrmModel>
  ) {}

  protected abstract toDomainDetails(ormModel: EventOrmModel): EventDetails;
  protected abstract toPersistanceDetails(event: Event): object;

  toPersistent(event: Event): EventOrmModel {
    const details = this.toPersistanceDetails(event);
    return new this.typeOrmModelConstructor({
      eventId: event.eventId.unpack(),
      entityId: event.aggregateId.unpack(),
      dateOccurred: event.dateOccurred.unpack(),
      eventName: event.eventName,
      entityType: event.aggregateType,
      data: details,
    });
  }

  toDomain(persistentObject: EventOrmModel): Event {
    const eventId = UUID.create(persistentObject.eventId);
    const entityId = UUID.create(persistentObject.entityId);
    const dateOccurred = DateVO.create(persistentObject.dateOccurred);
    const details = this.toDomainDetails(persistentObject);
    return new this.eventConstructor({
      ...details,
      eventId,
      aggregateId: entityId,
      dateOccurred,
    });
  }
}
