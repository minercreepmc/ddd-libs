import {
  Save,
  SaveMany,
  Delete,
  FindOne,
  FindOneById,
  Update,
} from './repository.plugin';

export interface EventStorePort<Event> extends Save<Event>, SaveMany<Event> {}

export interface RepositoryPort<Entity, EntityDetails>
  extends Save<Entity>,
    Delete<Entity>,
    FindOneById<Entity>,
    FindOne<Entity, EntityDetails>,
    Update<Entity> {}

export interface ProjectionRepositoryPort<ReadModel>
  extends Save<ReadModel>,
    Delete<ReadModel>,
    FindOne<ReadModel, ReadModel>,
    FindOneById<ReadModel>,
    Update<ReadModel> {}
