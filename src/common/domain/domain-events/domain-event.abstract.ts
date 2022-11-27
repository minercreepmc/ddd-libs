import { GuardUtils } from '@utils/guard';
import { ArgumentNotProvidedException } from '@tinphamm/common-exceptions';
import { DateVO, ID, UUID } from '@domain/value-objects';

export type DomainEventProps<T> = Omit<T, 'id' | 'dateOccurred'> & {
  dateOccurred?: DateVO;
  aggregateId: ID;
};
export type DomainEventClass = new (args: any) => DomainEvent;

export abstract class DomainEvent {
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly dateOccurred: number | Date;
  constructor(props: DomainEventProps<unknown>) {
    if (GuardUtils.isEmpty(props)) {
      throw new ArgumentNotProvidedException('DomainEvent cannot be empty');
    }
    this.id = UUID.create().unpack();
    this.aggregateId = props.aggregateId.unpack();
    this.dateOccurred = props.dateOccurred.unpack() || Date.now();
  }
}
