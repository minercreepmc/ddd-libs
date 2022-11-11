import { AggregateRoot } from '@domain/aggregate-root.abstract';
import { CreateEntityProps } from '@domain/entity.abstract';
import { DateVO, UUID } from '@domain/value-objects';
import { TypeOrmModel } from '../model';

export type OrmModelProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export abstract class OrmMapper<
  Aggregate extends AggregateRoot<unknown>,
  AggregateProps,
  OrmModel extends TypeOrmModel
> {
  constructor(
    private readonly entityConstructor: new (
      props: CreateEntityProps<any>
    ) => Aggregate,
    private readonly ormModelConstructor: new (props: any) => OrmModel
  ) {}

  protected abstract toPersistanceProps(
    aggregate: Aggregate
  ): OrmModelProps<OrmModel>;
  protected abstract toDomainProps(ormEntity: OrmModel): AggregateProps;

  toPersistance(aggregate: Aggregate): OrmModel {
    const props = this.toPersistanceProps(aggregate);

    return new this.ormModelConstructor({
      ...props,
      id: aggregate.id.unpack(),
      createdAt: aggregate.createdAt.unpack(),
      updatedAt: aggregate.updatedAt.unpack(),
    });
  }

  toDomain(ormEntity: OrmModel): Aggregate {
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
