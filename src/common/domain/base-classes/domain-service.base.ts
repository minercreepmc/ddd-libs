import { RepositoryPort } from '@domain/driven-adapters';

export abstract class DomainService<Entity> {
  protected abstract readonly repository: RepositoryPort<Entity>;
}
