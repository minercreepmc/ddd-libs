import { AbstractEntity } from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';
import {
  EntityConstructor,
  TypeOrmModelConstructor,
} from '@utils/patterns/mapper';
import { AbstractTypeOrmModel } from './typeorm.model.abstract';

export type OrmModelDetails<OrmModel> = Omit<
  OrmModel,
  'id' | 'createdAt' | 'updatedAt'
>;

export abstract class AbstractTypeOrmMapper<
  Entity extends AbstractEntity<unknown>,
  EntityDetails,
  OrmModel extends AbstractTypeOrmModel
> {
  constructor(
    private readonly entityConstructor: EntityConstructor<Entity>,
    private readonly typeOrmModelConstructor: TypeOrmModelConstructor<OrmModel>
  ) {}

  protected abstract toPersistanceDetails(
    entity: Entity
  ): OrmModelDetails<OrmModel>;
  protected abstract toDomainDetails(ormModel: OrmModel): EntityDetails;

  toPersistance(entity: Entity): OrmModel {
    const details = this.toPersistanceDetails(entity);

    return new this.typeOrmModelConstructor({
      ...details,
      id: entity.id.unpack(),
      createdAt: entity.createdAt.unpack(),
      updatedAt: entity.updatedAt.unpack(),
    });
  }

  toDomain(ormModel: OrmModel): Entity {
    const details = this.toDomainDetails(ormModel);
    const id = UUID.create(ormModel.id);
    const createdAt = DateVO.create(ormModel.createdAt);
    const updatedAt = DateVO.create(ormModel.updatedAt);

    return new this.entityConstructor({
      id,
      details,
      createdAt,
      updatedAt,
    });
  }
}
