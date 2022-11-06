import { RepositoryPort } from '@domain/driven-adapters';

export abstract class DomainService<Entity> {
  abstract readonly repository: RepositoryPort<Entity>;
}
