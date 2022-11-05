import { RepositoryPort } from '@domain/driven-adapters';

export abstract class DomainService<T> {
  protected constructor(protected readonly repository: RepositoryPort<T>) {}
}
