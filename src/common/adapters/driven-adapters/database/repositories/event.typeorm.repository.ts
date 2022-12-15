import { DomainEvent } from '@domain/domain-events';
import { EventRepositoryPort } from '@domain/driven-ports';
import { ILogger } from '@driven-adapters/interfaces';
import { Repository } from 'typeorm';
import { AbstractEventTypeOrmMapper } from '../mappers/event.typeorm.mapper.abstract';
import { EventTypeOrmModel } from '../models';

export class EventTypeOrmRepository<
  Event extends DomainEvent<any>,
  EventDetails,
  OrmModel extends EventTypeOrmModel<OrmModelDetails>,
  OrmModelDetails
> implements EventRepositoryPort<Event>
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

  async save(event: Event) {
    const eventOrmEntity = this.typeOrmMapper.toPersistent(event);
    const created = await this.typeOrmRepository.save(eventOrmEntity);
    this.logger.debug(`[Repository]: created ${created.eventId}`);
    return this.typeOrmMapper.toDomain(created);
  }
}
