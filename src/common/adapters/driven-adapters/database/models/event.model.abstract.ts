import { Column, PrimaryColumn } from 'typeorm';

export class EventTypeOrmModel {
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
  eventData: object;

  @Column()
  dateOccurred: Date;
}
