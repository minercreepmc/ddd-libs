import { ProjectionRepositoryPort } from '@domain/gateway/driven-ports';
import { ID } from '@domain/value-objects';
import { ILogger } from '@driven-adapters/interfaces';
import { Repository } from 'typeorm';
import { WhereClause } from '../mappers';
import { AbstractTypeOrmModel } from '../models';

export class AbstractProjectionRepository<
  ReadModel extends AbstractTypeOrmModel
> implements ProjectionRepositoryPort<ReadModel>
{
  constructor(
    protected readonly repository: Repository<ReadModel>,
    protected readonly logger: ILogger
  ) {}

  async save(model: ReadModel): Promise<ReadModel> {
    const created = await this.repository.save(model);
    this.logger.debug(`[Projection]: created ${created.id}`);
    return created;
  }

  async delete(model: ReadModel): Promise<boolean> {
    const deleted = await this.repository.remove(model);
    this.logger.debug(`[Projection]: deleted ${deleted.id}`);
    return Boolean(deleted);
  }

  async findOneById(id: string | ID): Promise<ReadModel | undefined> {
    const found = await this.repository
      .createQueryBuilder('collections')
      .where('collections.id = :id', {
        id: id instanceof ID ? id.unpack() : id,
      })
      .getOne();

    return found ? found : undefined;
  }

  async findOne(
    params: WhereClause<ReadModel> = {}
  ): Promise<ReadModel | undefined> {
    const found = await this.repository.findOne({
      where: params,
    });

    return found ? found : undefined;
  }

  async update(id: string, newState: ReadModel): Promise<ReadModel> {
    const updated = await this.repository.save({ id, ...newState });
    this.logger.debug(`[Projection]: updated ${updated.id}`);
    return updated;
  }
}