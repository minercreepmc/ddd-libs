import { AggregateRoot } from '@domain/base-classes';
import { QueryParams, RepositoryPort } from '@domain/driven-adapters';
import { ID } from '@domain/value-objects';
import { EventEmitter } from '@domain/events';
import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { OrmMapper } from './orm-mapper.base';
import { TypeOrmEntityBase } from './typeorm.entity.base';
import { Logger } from '@nestjs/common';

export type WhereClause<OrmEntity> =
  | FindOptionsWhere<OrmEntity>
  | FindOptionsWhere<OrmEntity>[]
  | ObjectLiteral
  | string;

export abstract class TypeormRepositoryBase<
  Aggregate extends AggregateRoot<unknown>,
  AggregateProps,
  OrmEntity extends TypeOrmEntityBase
> implements RepositoryPort<Aggregate> {
  protected constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: OrmMapper<Aggregate, AggregateProps, OrmEntity>,
    protected readonly eventEmitter: EventEmitter,
    protected readonly logger: Logger
  ) {}

  /**
   * Specify relations to other tables.
   * For example: `relations = ['user', ...]`
   */
  protected abstract relations: string[];

  abstract whereQuery(
    params: QueryParams<AggregateProps>
  ): WhereClause<OrmEntity>;

  async save(entity: Aggregate): Promise<Aggregate> {
    const ormEntity = this.mapper.toPersistance(entity);
    const created = await this.repository.save(ormEntity);

    this.logger.debug(`[Repository]: created ${created.id}`);
    await this.eventEmitter.publishEvents(entity.id, this.logger);
    return this.mapper.toDomain(created);
  }

  async delete(entity: Aggregate): Promise<boolean> {
    const ormEntity = this.mapper.toPersistance(entity);
    const deleted = await this.repository.remove(ormEntity);
    this.logger.debug(`[Repository]: deleted ${entity.id.unpack()}`);
    return Boolean(deleted);
  }

  async findOneById(id: ID | string): Promise<Aggregate | undefined> {
    const found = await this.repository
      .createQueryBuilder('collections')
      .where('collections.id = :id', {
        id: id instanceof ID ? id.unpack() : id,
      })
      .getOne();

    if (found) {
      return this.mapper.toDomain(found);
    } else {
      return undefined;
    }
  }
}
