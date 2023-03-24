import { IBaseEntity } from '@domain/entities';
import { ID } from '@domain/value-objects/id';

export type QueryParams<EntityDetails> = Partial<IBaseEntity & EntityDetails>;

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

export interface Update<Entity> {
  update(id: ID | string, newState: Entity): Promise<Entity>;
}

export interface Transaction {
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  runInTransaction<T>(fn: () => Promise<T>): Promise<T>;
}
