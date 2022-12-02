import { AbstractAggregateRoot } from '@domain';
import { RepositoryPort } from '@domain/driven-ports';
import { ID } from '@domain/value-objects';
import { Repository } from 'typeorm';
import {
  AbstractTypeOrmMapper,
  AbstractQueryMapper,
  QueryParams,
} from '../mappers';
import { ILogger } from '@driven-adapters/interfaces';
import { AbstractTypeOrmModel } from '../models';

export abstract class AbstractTypeormRepository<
  Aggregate extends AbstractAggregateRoot<unknown>,
  AggregateDetails,
  OrmModel extends AbstractTypeOrmModel
> implements RepositoryPort<Aggregate, AggregateDetails>
{
  protected constructor(
    protected readonly typeOrmRepository: Repository<OrmModel>,
    protected readonly typeOrmMapper: AbstractTypeOrmMapper<
      Aggregate,
      AggregateDetails,
      OrmModel
    >,
    protected readonly queryMapper: AbstractQueryMapper<
      AggregateDetails,
      OrmModel
    >,
    protected readonly logger: ILogger
  ) {}

  async save(entity: Aggregate): Promise<Aggregate> {
    const ormEntity = this.typeOrmMapper.toPersistance(entity);
    const created = await this.typeOrmRepository.save(ormEntity);

    this.logger.debug(`[Repository]: created ${created.id}`);
    return this.typeOrmMapper.toDomain(created);
  }

  async delete(entity: Aggregate): Promise<boolean> {
    const ormEntity = this.typeOrmMapper.toPersistance(entity);
    const deleted = await this.typeOrmRepository.remove(ormEntity);
    this.logger.debug(`[Repository]: deleted ${entity.id.unpack()}`);
    return Boolean(deleted);
  }

  async findOneById(id: ID | string): Promise<Aggregate | undefined> {
    const found = await this.typeOrmRepository
      .createQueryBuilder('collections')
      .where('collections.id = :id', {
        id: id instanceof ID ? id.unpack() : id,
      })
      .getOne();

    if (found) {
      return this.typeOrmMapper.toDomain(found);
    } else {
      return undefined;
    }
  }

  async findOne(
    params: QueryParams<AggregateDetails> = {}
  ): Promise<Aggregate | undefined> {
    const where = this.queryMapper.toQuery(params);
    const found = await this.typeOrmRepository.findOne({
      where,
    });

    return found ? this.typeOrmMapper.toDomain(found) : undefined;
  }
}
