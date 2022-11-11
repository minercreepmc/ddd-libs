import { GuardUtils } from '@utils/guard';
import { ArgumentNotProvidedException } from '@tinphamm/common-exceptions';
import { UUID } from '@domain/value-objects';

export type DomainEventProps<T> = Omit<T, 'id' | 'dateOccurred'> & {
  dateOccurred?: number;
  aggregateId: string;
};
export type DomainEventClass = new (args: any) => DomainEvent;

export abstract class DomainEvent {
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly dateOccurred: number;
  constructor(props: DomainEventProps<unknown>) {
    if (GuardUtils.isEmpty(props)) {
      throw new ArgumentNotProvidedException('DomainEvent cannot be empty');
    }
    this.id = UUID.create().unpack();
    this.aggregateId = props.aggregateId;
    this.dateOccurred = props.dateOccurred || Date.now();
  }
}
