import { IBaseEntity } from '@domain/entities';
import { FindOptionsWhere } from 'typeorm';

export type QueryParams<AggregateDetails> = Partial<
  IBaseEntity & AggregateDetails
>;

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[];

export abstract class AbstractQueryMapper<AggregateDetails, OrmModel> {
  abstract toQuery(
    params: QueryParams<AggregateDetails>
  ): WhereClause<OrmModel>;
}
