import { DeepPartial } from '@types';
import { ID } from '../value-objects';
import { BaseEntityProps } from '..';

export type QueryParams<EntityProps> = DeepPartial<
  BaseEntityProps & EntityProps
>;

// export interface FindOne<Entity, EntityProps> {
//   findOne(params: QueryParams<EntityProps>): Promise<Entity | null>;
// }

export interface FindOneById<Entity> {
  findOneById(id: ID | string): Promise<Entity | undefined>;
}

export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export interface Delete<Entity> {
  delete(entity: Entity): Promise<boolean>;
}

export interface RepositoryPort<Entity>
  extends Save<Entity>,
    Delete<Entity>,
    FindOneById<Entity> {}