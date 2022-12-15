import { Column, PrimaryColumn } from 'typeorm';

export class EventTypeOrmModel<EventDetails> {
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
