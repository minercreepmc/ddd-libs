import { AggregateRoot, CreateEntityProps } from '@domain/base-classes';
import { DateVO, UUID } from '@domain/value-objects';
import { TypeOrmEntityBase } from './typeorm.entity.base';

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export abstract class OrmMapper<
  Entity extends AggregateRoot<unknown>,
  EntityProps,
  OrmEntity extends TypeOrmEntityBase
> {
  constructor(
    readonly entityConstructor: new (props: CreateEntityProps<any>) => Entity,
    readonly ormEntityConstructor: new (props: any) => OrmEntity
  ) {}

  protected abstract toPersistanceProps(
    entity: Entity
  ): OrmEntityProps<OrmEntity>;
  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps;

  toPersistance(entity: Entity): OrmEntity {
    const props = this.toPersistanceProps(entity);

    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.unpack(),
      createdAt: entity.createdAt.unpack(),
      updatedAt: entity.updatedAt.unpack(),
    });
  }

  toDomain(ormEntity: OrmEntity): Entity {
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
