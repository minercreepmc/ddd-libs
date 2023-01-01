import { QueryParams, WhereClause } from '@driven-adapters/database';
import { ID } from '../value-objects/id';

export namespace RepositoryPlugin {
  export interface FindOne<Entity, EntityDetails> {
    findOne(
      params: QueryParams<EntityDetails> | WhereClause<Entity>
    ): Promise<Entity | undefined>;
  }

  export interface FindOneById<Entity> {
    findOneById(id: ID | string): Promise<Entity | undefined>;
  }

  export interface Save<Entity> {
    save(entity: Entity): Promise<Entity>;
  }

  export interface SaveMany<Entity> {
    saveMany(entities: Entity[]): Promise<Entity[]>;
  }

  export interface Delete<Entity> {
    delete(entity: Entity): Promise<boolean>;
  }
}
