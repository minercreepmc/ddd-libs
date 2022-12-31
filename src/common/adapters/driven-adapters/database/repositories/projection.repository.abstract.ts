import { RepositoryPort } from '@domain/driven-ports';
import { ID } from '@domain/value-objects';
import { ILogger } from '@driven-adapters/interfaces';
import { PersistentMapper } from '@utils/patterns';
import { Repository } from 'typeorm';
import { AbstractQueryMapper, QueryParams } from '../mappers';
import { AbstractTypeOrmModel } from '../models';

export class AbstractProjectionRepository<
  DomainModel,
  OrmEntity extends AbstractTypeOrmModel
> implements RepositoryPort<DomainModel, DomainModel>
{
  constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly mapper: PersistentMapper<DomainModel, OrmEntity>,
    protected readonly queryMapper: AbstractQueryMapper<DomainModel, OrmEntity>,
    protected readonly logger: ILogger
  ) {}

  async save(model: DomainModel): Promise<DomainModel> {
    const ormModel = this.mapper.toPersistent(model);
    const created = await this.repository.save(ormModel);
    this.logger.debug(`[Repository]: created ${created.id}`);
    return this.mapper.toDomain(created);
  }

  async delete(model: DomainModel): Promise<boolean> {
    const ormModel = this.mapper.toPersistent(model);
    const deleted = await this.repository.remove(ormModel);
    this.logger.debug(`[Repository]: deleted ${deleted.id}`);
    return Boolean(deleted);
  }

  async findOneById(id: string | ID): Promise<DomainModel> {
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

  async findOne(
    params: QueryParams<DomainModel> = {}
  ): Promise<DomainModel | undefined> {
    const where = this.queryMapper.toQuery(params);
    const found = await this.repository.findOne({
      where,
    });

    return found ? this.mapper.toDomain(found) : undefined;
  }
}
