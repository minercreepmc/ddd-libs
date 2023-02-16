import { IBaseEntity } from '@domain/entities';
import { FindOptionsWhere } from 'typeorm';

export type QueryParams<EntityDetails> = Partial<IBaseEntity & EntityDetails>;

export type WhereClause<OrmModel> =
  | FindOptionsWhere<OrmModel>
  | FindOptionsWhere<OrmModel>[];

export abstract class AbstractQueryMapper<EntityDetails, OrmModel> {
  abstract toQuery(params: QueryParams<EntityDetails>): WhereClause<OrmModel>;
}
