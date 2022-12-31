import { RepositoryPort } from '@domain/driven-ports';
import { ID } from '@domain/value-objects';
import { Repository } from 'typeorm';
import { WhereClause } from '../mappers';

export class AbstractProjectionRepository<OrmEntity>
  implements RepositoryPort<OrmEntity, OrmEntity>
{
  constructor(protected readonly repository: Repository<OrmEntity>) {}

  async save(entity: OrmEntity): Promise<OrmEntity> {
    return this.repository.save(entity);
  }

  async delete(entity: OrmEntity): Promise<boolean> {
    const deleted = this.repository.remove(entity);
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
