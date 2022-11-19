import { AggregateRoot } from '@domain/aggregate-root.abstract';
import { ID } from '@domain/value-objects';
import { ILogger } from '@driven-adapters/interfaces';
import { DomainEventHandler } from '../domain-event-handler.abstract';
import { DomainEvent, DomainEventClass } from '../domain-event.abstract';

type EventName = string;

export class DomainEventPublisher {
  private static aggregates: AggregateRoot<unknown>[] = [];
  private static subscriber: Map<EventName, DomainEventHandler[]> = new Map();

  // =====Prepare======
  static prepareForPublish(aggregate: AggregateRoot<unknown>): void {
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
  async publishEvents(id: ID, logger: ILogger): Promise<void> {
    const aggregate = DomainEventPublisher.findAggregateById(id);

    if (aggregate) {
      logger.debug(
        `[${aggregate.domainEvents.map(
          (event) => event.constructor.name
        )}] published ${aggregate.id.unpack()}`
      );
      DomainEventPublisher.publishAggregateEvents(aggregate);
      aggregate.clearEvent();
      DomainEventPublisher.removeAggregateFromPublishList(aggregate);
    }
  }

  private static async publishAggregateEvents(
    aggregate: AggregateRoot<unknown>
  ) {
    const domainEventsReadyToPublishAsync = aggregate.domainEvents.map(
      (event) => {
        return this.publish(event);
      }
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
    aggregate: AggregateRoot<unknown>
  ) {
    const index = this.aggregates.findIndex((a) => a.equals(aggregate));
    this.aggregates.splice(index, 1);
  }

  // ======subscribe======
  static subscribe(
    event: DomainEventClass,
    eventHandler: DomainEventHandler
  ): void {
    const eventName = event.name;
    if (!this.subscriber.has(eventName)) {
      this.subscriber.set(eventName, []);
    }

    this.subscriber.get(eventName).push(eventHandler);
  }
}
