import { AggregateRoot } from '@domain/aggregate-root.abstract';
import { CreateEntityProps } from '@domain/entity.abstract';
import { DateVO, UUID } from '@domain/value-objects';
import { TypeOrmModel } from '../model';

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export abstract class OrmMapper<
  Entity extends AggregateRoot<unknown>,
  EntityProps,
  OrmModel extends TypeOrmModel
> {
  constructor(
    readonly entityConstructor: new (props: CreateEntityProps<any>) => Entity,
    readonly ormModelConstructor: new (props: any) => OrmModel
  ) {}

  protected abstract toPersistanceProps(
    entity: Entity
  ): OrmEntityProps<OrmModel>;
  protected abstract toDomainProps(ormEntity: OrmModel): EntityProps;

  toPersistance(entity: Entity): OrmModel {
    const props = this.toPersistanceProps(entity);

    return new this.ormModelConstructor({
      ...props,
      id: entity.id.unpack(),
      createdAt: entity.createdAt.unpack(),
      updatedAt: entity.updatedAt.unpack(),
    });
  }

  toDomain(ormEntity: OrmModel): Entity {
    const props = this.toDomainProps(ormEntity);
    const id = UUID.create(ormEntity.id);
    const createdAt = DateVO.create(ormEntity.createdAt);
    const updatedAt = DateVO.create(ormEntity.updatedAt);

    return new this.entityConstructor({
      id,
      props,
      createdAt,
      updatedAt,
    });
  }
}
