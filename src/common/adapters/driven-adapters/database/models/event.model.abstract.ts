import { Column } from 'typeorm';
import { AbstractTypeOrmModel } from './typeorm.model.abstract';

export class AbstractEventModel<
  EventClassName,
  Entity
> extends AbstractTypeOrmModel {
  @Column()
  name: EventClassName;

  @Column()
  entityType: Entity;

  @Column()
  entityId: string;

  @Column('simple-json')
  data: string;
}
