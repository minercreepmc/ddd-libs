import { AggregateRoot } from '@domain/aggregates';
import { CreateEntityProps } from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';
import { AbstractTypeOrmModel } from '../models';

export type OrmModelProps<OrmModel> = Omit<
  OrmModel,
  'id' | 'createdAt' | 'updatedAt'
>;

export type AggregateConstructor<Aggregate> = new (
  props: CreateEntityProps<any>
) => Aggregate;

export type TypeOrmModelConstructor<OrmModel> = new (props: any) => OrmModel;

export abstract class AbstractTypeOrmMapper<
  Aggregate extends AggregateRoot<unknown>,
  AggregateProps,
  OrmModel extends AbstractTypeOrmModel
> {
  constructor(
    private readonly aggregateConstructor: AggregateConstructor<Aggregate>,
    private readonly typeOrmModelConstructor: TypeOrmModelConstructor<OrmModel>
  ) {}

  protected abstract toPersistanceProps(
    aggregate: Aggregate
  ): OrmModelProps<OrmModel>;
  protected abstract toDomainProps(ormModel: OrmModel): AggregateProps;

  toPersistance(aggregate: Aggregate): OrmModel {
    const props = this.toPersistanceProps(aggregate);

    return new this.typeOrmModelConstructor({
      ...props,
      id: aggregate.id.unpack(),
      createdAt: aggregate.createdAt.unpack(),
      updatedAt: aggregate.updatedAt.unpack(),
    });
  }

  toDomain(ormModel: OrmModel): Aggregate {
    const props = this.toDomainProps(ormModel);
    const id = UUID.create(ormModel.id);
    const createdAt = DateVO.create(ormModel.createdAt);
    const updatedAt = DateVO.create(ormModel.updatedAt);

    return new this.aggregateConstructor({
      id,
      props,
      createdAt,
      updatedAt,
    });
  }
}
