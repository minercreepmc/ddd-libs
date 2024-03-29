import {
  Save,
  SaveMany,
  Delete,
  FindOne,
  FindOneById,
  Update,
  Transaction,
} from './repository.plugin';

export interface EventStorePort<Event>
  extends Save<Event>,
    SaveMany<Event>,
    Transaction {}

export interface RepositoryPort<Entity, EntityDetails>
  extends Save<Entity>,
    Delete<Entity>,
    FindOneById<Entity>,
    FindOne<Entity, EntityDetails>,
    Update<Entity>,
    Transaction {}

export interface ProjectionRepositoryPort<ReadModel>
  extends Save<ReadModel>,
    Delete<ReadModel>,
    FindOne<ReadModel, ReadModel>,
    FindOneById<ReadModel>,
    Update<ReadModel> {}
