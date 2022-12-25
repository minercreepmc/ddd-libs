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
  OrmModel extends EventTypeOrmModel<OrmModelDetails>,
  OrmModelDetails
> implements EventStorePort<Event>
{
  protected constructor(
    protected readonly typeOrmRepository: Repository<OrmModel>,
    protected readonly typeOrmMapper: AbstractEventTypeOrmMapper<
      Event,
      EventDetails,
      OrmModel,
      OrmModelDetails
    >,
    protected readonly logger: ILogger
  ) {}

  protected abstract relations: string[];
  protected abstract aggregate: AbstractAggregateRoot<any>;
  abstract rebuild<T>(): Promise<T[]>;

  async getAllEvents() {
    const events = await this.typeOrmRepository.find({
      relations: this.relations,
    });
    return events.map((event) => this.typeOrmMapper.toDomain(event));
  }

  async save(event: Event) {
    const eventOrmEntity = this.typeOrmMapper.toPersistent(event);
    const saved = await this.typeOrmRepository.save(eventOrmEntity);
    this.logger.debug(`[EventStore]: created ${saved.eventId}`);
    return this.typeOrmMapper.toDomain(saved);
  }

  async saveMany(events: Event[]) {
    const eventsOrmEntity = events.map((event) =>
      this.typeOrmMapper.toPersistent(event)
    );
    const eventsSaved = await Promise.all(
      eventsOrmEntity.map((event) => this.typeOrmRepository.save(event))
    );

    eventsSaved.forEach((event) => {
      this.logger.debug(`[EventStore]: created ${event.eventId}`);
    });

    return eventsSaved.map((event) => this.typeOrmMapper.toDomain(event));
  }
}
