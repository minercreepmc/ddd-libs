import { Column, PrimaryColumn } from 'typeorm';

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
  name: string;

  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column('jsonb')
  eventData: EventDetails;

  @Column()
  dateOccurred: Date;
}
