export type EventConstructor<Event> = new (...details: any) => Event;
export type EntityConstructor<Entity> = new (...details: any) => Entity;
export type TypeOrmModelConstructor<OrmModel> = new (details: any) => OrmModel;

export type EventConstructorDocuments<
  DomainEventName extends string,
  DomainEventClass
> = Record<DomainEventName, DomainEventClass>;
