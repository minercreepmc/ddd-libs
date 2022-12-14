import { DomainEvent } from '@domain/domain-events';
import { EventRepositoryPort } from '@domain/driven-ports';
import { ILogger } from '@driven-adapters/interfaces';
import { Repository } from 'typeorm';
import { EventTypeOrmMapperAbstract } from '../mappers/event.typeorm.mapper.abstract';
import { AbstractEventTypeOrmModel } from '../models';

export class EventTypeOrmRepository<
  Event extends DomainEvent<any>,
  EventDetails,
  OrmModel extends AbstractEventTypeOrmModel
> implements EventRepositoryPort<Event>
{
  protected constructor(
    protected readonly typeOrmRepository: Repository<OrmModel>,
    protected readonly typeOrmMapper: EventTypeOrmMapperAbstract<
      Event,
      EventDetails,
      OrmModel
    >,
    protected readonly logger: ILogger
  ) {}

  async save(event: Event) {
    const eventOrmEntity = this.typeOrmMapper.toPersistent(event);
    const created = await this.typeOrmRepository.save(eventOrmEntity);
    this.logger.debug(`[Repository]: created ${created.eventId}`);
    return this.typeOrmMapper.toDomain(created);
  }
}