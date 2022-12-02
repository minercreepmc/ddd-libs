import { AbstractAggregateRoot } from '@domain/aggregates';
import { ICreateEntity } from '@domain/entities';
import { DateVO, UUID } from '@domain/value-objects';
import { AbstractTypeOrmModel } from '../models';

export type OrmModelDetails<OrmModel> = Omit<
  OrmModel,
  'id' | 'createdAt' | 'updatedAt'
>;

export type AggregateConstructor<Aggregate> = new (
  details: ICreateEntity<any>
) => Aggregate;
export type TypeOrmModelConstructor<OrmModel> = new (details: any) => OrmModel;

export abstract class AbstractTypeOrmMapper<
  Aggregate extends AbstractAggregateRoot<unknown>,
  AggregateDetails,
  OrmModel extends AbstractTypeOrmModel
> {
  constructor(
    private readonly aggregateConstructor: AggregateConstructor<Aggregate>,
    private readonly typeOrmModelConstructor: TypeOrmModelConstructor<OrmModel>
  ) {}

  protected abstract toPersistanceDetails(
    aggregate: Aggregate
  ): OrmModelDetails<OrmModel>;
  protected abstract toDomainDetails(ormModel: OrmModel): AggregateDetails;

  toPersistance(aggregate: Aggregate): OrmModel {
    const details = this.toPersistanceDetails(aggregate);

    return new this.typeOrmModelConstructor({
      ...details,
      id: aggregate.id.unpack(),
      createdAt: aggregate.createdAt.unpack(),
      updatedAt: aggregate.updatedAt.unpack(),
    });
  }

  toDomain(ormModel: OrmModel): Aggregate {
    const details = this.toDomainDetails(ormModel);
    const id = UUID.create(ormModel.id);
    const createdAt = DateVO.create(ormModel.createdAt);
    const updatedAt = DateVO.create(ormModel.updatedAt);

    return new this.aggregateConstructor({
      id,
      details,
      createdAt,
      updatedAt,
    });
  }
}
