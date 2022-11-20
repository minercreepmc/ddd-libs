import { BaseEntityProps } from '@domain/entities';
import { FindOptionsWhere } from 'typeorm';

export type QueryParams<AggregateProps> = Partial<
  BaseEntityProps & AggregateProps
>;

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[];

export abstract class QueryMapper<AggregateProps, OrmModel> {
  abstract toQuery(params: QueryParams<AggregateProps>): WhereClause<OrmModel>;
}
