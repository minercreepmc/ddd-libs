import { Column, Index, PrimaryColumn } from 'typeorm';

export class EventTypeOrmModel<EventDetails> {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false })
  eventId: string;

  @Column()
  eventName: string;

  @Column()
  entityType: string;

  @Column()
  @Index()
  entityId: string;

  @Column('jsonb')
  eventData: EventDetails;

  @Column()
  dateOccurred: Date;
}
