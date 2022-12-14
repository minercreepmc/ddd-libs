export type EventConstructor<Event> = new (...details: any) => Event;
export type EntityConstructor<Entity> = new (...details: any) => Entity;
export type TypeOrmModelConstructor<OrmModel> = new (details: any) => OrmModel;
