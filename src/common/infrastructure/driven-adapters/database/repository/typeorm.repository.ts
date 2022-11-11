import { AggregateRoot } from '@domain';
import { QueryParams, RepositoryPort } from '@domain/driven-ports';
import { ID } from '@domain/value-objects';
import { DomainEventPublisher } from '@domain/domain-events';
import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { OrmMapper } from '@infrastructure/driven-adapters/database/mapper';
import { TypeOrmModel } from '@infrastructure/driven-adapters/database/model';
import { Logger } from '@nestjs/common';

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[]
  | ObjectLiteral
  | string;

export abstract class TypeormRepositoryBase<
  Aggregate extends AggregateRoot<unknown>,
  AggregateProps,
  OrmModel extends TypeOrmModel
> implements RepositoryPort<Aggregate> {
  protected constructor(
    protected readonly repository: Repository<OrmModel>,
    protected readonly mapper: OrmMapper<Aggregate, AggregateProps, OrmModel>,
    protected readonly eventEmitter: DomainEventPublisher,
    protected readonly logger: Logger
  ) {}

  /**
   * Specify relations to other tables.
   * For example: `relations = ['user', ...]`
   */
  protected abstract relations: string[];

  abstract whereQuery(
    params: QueryParams<AggregateProps>
  ): WhereClause<OrmModel>;

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
