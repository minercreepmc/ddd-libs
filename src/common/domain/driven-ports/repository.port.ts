import { QueryParams } from '@driven-adapters/database';
import { ID } from '../value-objects';

export interface FindOne<Entity, EntityDetails> {
  findOne(params: QueryParams<EntityDetails>): Promise<Entity | undefined>;
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

export interface EventStorePort<Event> extends Save<Event>, SaveMany<Event> {}

export interface RepositoryPort<Entity, EntityDetails>
  extends Save<Entity>,
    Delete<Entity>,
    FindOneById<Entity>,
    FindOne<Entity, EntityDetails> {}
