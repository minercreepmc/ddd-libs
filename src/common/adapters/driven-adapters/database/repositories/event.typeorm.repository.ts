import { AbstractAggregateRoot } from '@domain/aggregates';
import { DomainEvent } from '@domain/domain-events';
import { EventStorePort } from '@domain/driven-ports';
import { ILogger } from '@driven-adapters/interfaces';
import { Repository } from 'typeorm';
import { AbstractEventTypeOrmMapper } from '../mappers/event.typeorm.mapper.abstract';
import { EventTypeOrmModel } from '../models';

export abstract class EventStoreTypeOrm<
  Event extends DomainEvent<any>,
  EventDetails,
  EventOrmModel extends EventTypeOrmModel<EventOrmModelDetails>,
  EventOrmModelDetails
> implements EventStorePort<Event>
{
  protected constructor(
    protected readonly eventRepository: Repository<EventOrmModel>,
    protected readonly typeOrmMapper: AbstractEventTypeOrmMapper<
      Event,
      EventDetails,
      EventOrmModel,
      EventOrmModelDetails
    >,
    protected readonly logger: ILogger
  ) {}

  protected abstract relations: string[];
  abstract rebuildStream(...args: any): Promise<any>;

  async save(event: Event) {
    const eventOrmEntity = this.typeOrmMapper.toPersistent(event);
    const saved = await this.eventRepository.save(eventOrmEntity);
    this.logger.debug(`[EventStore]: created ${saved.eventId}`);
    return this.typeOrmMapper.toDomain(saved);
  }

  async saveMany(events: Event[]) {
    const eventsOrmEntity = events.map((event) =>
      this.typeOrmMapper.toPersistent(event)
    );
    const eventsSaved = await Promise.all(
      eventsOrmEntity.map((event) => this.eventRepository.save(event))
    );

    eventsSaved.forEach((event) => {
      this.logger.debug(`[EventStore]: created ${event.eventId}`);
    });

    return eventsSaved.map((event) => this.typeOrmMapper.toDomain(event));
  }
}
