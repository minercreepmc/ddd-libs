import { RepositoryPlugin } from './repository.plugin';

export interface EventStorePort<Event>
  extends RepositoryPlugin.Save<Event>,
    RepositoryPlugin.SaveMany<Event> {}

export interface RepositoryPort<Entity, EntityDetails>
  extends RepositoryPlugin.Save<Entity>,
    RepositoryPlugin.Delete<Entity>,
    RepositoryPlugin.FindOneById<Entity>,
    RepositoryPlugin.FindOne<Entity, EntityDetails> {}
