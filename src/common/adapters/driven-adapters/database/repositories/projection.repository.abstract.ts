import { RepositoryPort } from '@domain/driven-ports';
import { ID } from '@domain/value-objects';
import { ILogger } from '@driven-adapters/interfaces';
import { Repository } from 'typeorm';
import { WhereClause } from '../mappers';
import { AbstractTypeOrmModel } from '../models';

export class AbstractProjectionRepository<
  OrmEntity extends AbstractTypeOrmModel
> implements RepositoryPort<OrmEntity, OrmEntity>
{
  constructor(
    protected readonly repository: Repository<OrmEntity>,
    protected readonly logger: ILogger
  ) {}

  async save(entity: OrmEntity): Promise<OrmEntity> {
    const created = await this.repository.save(entity);
    this.logger.debug(`[Repository]: created ${created.id}`);
    return created;
  }

  async delete(entity: OrmEntity): Promise<boolean> {
    const deleted = this.repository.remove(entity);
    this.logger.debug(`[Repository]: deleted ${entity.id}`);
    return Boolean(deleted);
  }

  async findOneById(id: string | ID): Promise<OrmEntity> {
    const found = await this.repository
      .createQueryBuilder('collections')
      .where('collections.id = :id', {
        id: id instanceof ID ? id.unpack() : id,
      })
      .getOne();

    return found ? found : undefined;
  }

  async findOne(
    params: WhereClause<OrmEntity> = {}
  ): Promise<OrmEntity | undefined> {
    const found = await this.repository.findOne({
      where: params,
    });

    return found ? found : undefined;
  }
}
