import { DomainEvent } from '@domain/domain-events';
import { EventStorePort } from '@domain/gateway/driven-ports';
import { ILogger } from '@driven-adapters/interfaces';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { EventTypeOrmModel } from './event.model.abstract';
import { AbstractEventTypeOrmMapper } from './event.typeorm.mapper.abstract';

/**
 * An abstract class representing a TypeORM implementation of an event store.
 */
export abstract class EventStoreTypeOrm<
  Event extends DomainEvent<any>,
  EventDetails,
  EventOrmModel extends EventTypeOrmModel<EventOrmModelDetails>,
  EventOrmModelDetails
> implements EventStorePort<Event>
{
  /**
   * Creates an instance of EventStoreTypeOrm.
   *
   * @param {Repository<EventOrmModel>} eventRepository The TypeORM repository for the event model.
   * @param {AbstractEventTypeOrmMapper<Event, EventDetails, EventOrmModel, EventOrmModelDetails>} typeOrmMapper The mapper that maps events and event models.
   * @param {ILogger} logger The logger to use for logging.
   * @param {DataSource} dataSource The TypeORM data source.
   */
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

  /**
   * Rebuilds the stream of events.
   *
   * @param {...any} args The arguments for the rebuild stream method.
   *
   * @returns {Promise<any>} A promise that resolves when the stream has been rebuilt.
   */
  abstract rebuildStream(...args: any): Promise<any>;
  isTransactionStarted = false;
  abstract modelClass: new (...args: any) => EventOrmModel;

  /**
   * Saves an event to the event store.
   *
   * @param event - The event to save.
   *
   * @returns A promise that resolves with the saved event.
   */
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

  /**
   * Saves multiple events to the event store.
   *
   * @param events - The events to save.
   *
   * @returns A promise that resolves with the saved events.
   */
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

  /**
   * Starts a transaction.
   *
   * @returns A promise that resolves when the transaction has started.
   */
  async startTransaction(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
    this.isTransactionStarted = true;
  }

  /**
   * Commits a transaction.
   *
   * @returns A promise that resolves when the transaction has been committed.
   */
  async commitTransaction(): Promise<void> {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
    this.isTransactionStarted = false;
  }
  /**
   * Rolls back a transaction.
   *
   * @returns A promise that resolves when the transaction has been rolled back.
   */
  async rollbackTransaction(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
    this.isTransactionStarted = false;
  }

  /**
   * Runs the given function in a transaction, starting a new one if necessary, and commits or rolls back the transaction
   * based on whether the function completes successfully or throws an error.
   *
   * @template T The return type of the function.
   * @param fn The function to run in a transaction.
   * @returns A promise that resolves with the result of the function, or rejects with the error thrown by the function.
   * @throws Throws an error if the transaction could not be started, committed, or rolled back.
   */
  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    try {
      await this.startTransaction();
      const result = await fn();
      await this.commitTransaction();
      return result;
    } catch (err) {
      await this.rollbackTransaction();
      throw err;
    }
  }
}
