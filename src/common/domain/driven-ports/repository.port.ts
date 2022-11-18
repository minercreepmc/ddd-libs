import { QueryParams } from '@driven-adapters/database';
import { ID } from '../value-objects';

export interface FindOne<Aggregate, AggregateProps> {
  findOne(params: QueryParams<AggregateProps>): Promise<Aggregate | undefined>;
}

export interface FindOneById<Aggregate> {
  findOneById(id: ID | string): Promise<Aggregate | undefined>;
}

export interface Save<Aggregate> {
  save(entity: Aggregate): Promise<Aggregate>;
}

export interface Delete<Aggregate> {
  delete(entity: Aggregate): Promise<boolean>;
}

export interface RepositoryPort<Aggregate, AggregateProps>
  extends Save<Aggregate>,
    Delete<Aggregate>,
    FindOneById<Aggregate>,
    FindOne<Aggregate, AggregateProps> {}
