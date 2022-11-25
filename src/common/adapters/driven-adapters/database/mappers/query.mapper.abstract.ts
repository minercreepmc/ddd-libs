import { IBaseEntity } from '@domain/entities';
import { FindOptionsWhere } from 'typeorm';

export type QueryParams<AggregateProps> = Partial<IBaseEntity & AggregateProps>;

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[];

export abstract class AbstractQueryMapper<AggregateProps, OrmModel> {
  abstract toQuery(params: QueryParams<AggregateProps>): WhereClause<OrmModel>;
}
