export class AggregateResultWithDomainEvent<IAggregate, IDomainEvent> {
  constructor(
    readonly aggregate: IAggregate,
    readonly domainEvents: IDomainEvent
  ) {}
}
