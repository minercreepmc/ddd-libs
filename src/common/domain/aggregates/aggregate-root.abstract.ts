import { AbstractEntity } from '../entities';

export type AggregateType<A> = new (args: any) => AbstractAggregateRoot<A>;

export abstract class AbstractAggregateRoot<
  EntityDetails
> extends AbstractEntity<EntityDetails> {}
