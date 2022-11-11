import { AggregateRoot } from '@domain';
import { QueryParams, RepositoryPort } from '@domain/driven-ports';
import { ID } from '@domain/value-objects';
import { Repository, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { OrmMapper } from '@infrastructure/driven-adapters/database/mapper';
import { TypeOrmModel } from '@infrastructure/driven-adapters/database/model';
import { ILogger } from '@infrastructure/interfaces';

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[]
  | ObjectLiteral
  | string;

export abstract class TypeormRepository<
  Aggregate extends AggregateRoot<unknown>,
  AggregateProps,
  OrmModel extends TypeOrmModel
> implements RepositoryPort<Aggregate> {
  protected constructor(
    protected readonly repository: Repository<OrmModel>,
    protected readonly mapper: OrmMapper<Aggregate, AggregateProps, OrmModel>,
    protected readonly logger: ILogger
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
