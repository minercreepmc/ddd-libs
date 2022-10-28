import { Logger } from '@nestjs/common';
import { AggregateRoot } from '../base-classes/aggregate-root.base';
import { ID } from '../value-objects/id';
import { DomainEventHandler } from './domain-event-handler.base';
import { DomainEvent, DomainEventClass } from './domain-event.base';

type EventName = string;

export class EventEmitter {
  private static aggregates: AggregateRoot<unknown>[] = [];
  private static subscriber: Map<EventName, DomainEventHandler[]> = new Map();

  // =====Prepare======
  static prepareForPublish(aggregate: AggregateRoot<unknown>) {
    const aggregateFound = Boolean(this.findAggregateById(aggregate.id));
    if (!aggregateFound) {
      this.aggregates.push(aggregate);
    }
  }

  private static findAggregateById(id: ID): AggregateRoot<unknown> | undefined {
    for (const aggregate of this.aggregates) {
      if (aggregate.id.equals(id)) {
        return aggregate;
      }
    }
  }

  // =======Publish=======
  async publishEvents(id: ID, logger: Logger) {
    const aggregate = EventEmitter.findAggregateById(id);

    if (aggregate) {
      logger.debug(
        `[${aggregate.domainEvents.map(
          (event) => event.constructor.name,
        )}] published ${aggregate.id.unpack()}`,
      );
      EventEmitter.publishAggregateEvents(aggregate);
      aggregate.clearEvent();
      EventEmitter.removeAggregateFromPublishList(aggregate);
    }
  }

  private static async publishAggregateEvents(
    aggregate: AggregateRoot<unknown>,
  ) {
    const domainEventsReadyToPublishAsync = aggregate.domainEvents.map(
      (event) => {
        return this.publish(event);
      },
    );
    await Promise.all(domainEventsReadyToPublishAsync);
  }

  private static async publish(event: DomainEvent) {
    const eventName = event.constructor.name;

    if (this.subscriber.has(eventName)) {
      const subscriber = this.subscriber.get(eventName);
      await Promise.all(subscriber.map((handler) => handler.handle(event)));
    }
  }

  private static removeAggregateFromPublishList(
    aggregate: AggregateRoot<unknown>,
  ) {
    const index = this.aggregates.findIndex((a) => a.equals(aggregate));
    this.aggregates.splice(index, 1);
  }

  // ======subscribe======
  static subscribe(
    event: DomainEventClass,
    eventHandler: DomainEventHandler,
  ): void {
    const eventName = event.name;
    if (!this.subscriber.has(eventName)) {
      this.subscriber.set(eventName, []);
    }

    this.subscriber.get(eventName).push(eventHandler);
  }
}
