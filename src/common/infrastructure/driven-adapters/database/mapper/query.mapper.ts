import { BaseEntityProps } from '@domain/entity.abstract';
import { DeepPartial } from '@types';
import { FindOptionsWhere, ObjectLiteral } from 'typeorm';

export type QueryParams<AggregateProps> = DeepPartial<
  BaseEntityProps & AggregateProps
>;

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[];

export abstract class QueryMapper<AggregateProps, OrmModel> {
  abstract toQuery(params: QueryParams<AggregateProps>): WhereClause<OrmModel>;
}
