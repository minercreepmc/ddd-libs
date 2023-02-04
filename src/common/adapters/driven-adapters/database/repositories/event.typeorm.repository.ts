import { DomainEvent } from '@domain/domain-events';
import { EventStorePort } from '@domain/gateway/driven-ports';
import { ILogger } from '@driven-adapters/interfaces';
import { DataSource, QueryRunner, Repository } from 'typeorm';
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
    protected readonly logger: ILogger,
    dataSource: DataSource
  ) {
    this.queryRunner = dataSource.createQueryRunner();
  }

  protected queryRunner: QueryRunner;
  protected dataSource: DataSource;
  protected abstract relations: string[];
  abstract rebuildStream(...args: any): Promise<any>;
  isTransactionStarted = false;
  abstract modelClass: new (...args: any) => EventOrmModel;

  async save(event: Event) {
    const eventOrmEntity = this.typeOrmMapper.toPersistent(event);

    let saved;
    if (this.isTransactionStarted) {
      saved = await this.queryRunner.manager
        .getRepository(this.modelClass)
        .save(eventOrmEntity);
    } else {
      saved = await this.eventRepository.save(eventOrmEntity);
    }

    this.logger.debug(`[EventStore]: created ${saved.eventId}`);
    return this.typeOrmMapper.toDomain(saved);
  }

  async saveMany(events: Event[]) {
    const eventsOrmEntity = events.map((event) =>
      this.typeOrmMapper.toPersistent(event)
    );

    let eventsSaved;
    if (this.isTransactionStarted) {
      eventsSaved = await Promise.all(
        eventsOrmEntity.map((event) =>
          this.queryRunner.manager.getRepository(this.modelClass).save(event)
        )
      );
    } else {
      eventsSaved = await Promise.all(
        eventsOrmEntity.map((event) => this.eventRepository.save(event))
      );
    }

    eventsSaved.forEach((event) => {
      this.logger.debug(`[EventStore]: created ${event.eventId}`);
    });

    return eventsSaved.map((event) => this.typeOrmMapper.toDomain(event));
  }

  async startTransaction(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
    this.isTransactionStarted = true;
  }

  async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
    this.isTransactionStarted = false;
  }
  async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
    this.isTransactionStarted = false;
  }
}
