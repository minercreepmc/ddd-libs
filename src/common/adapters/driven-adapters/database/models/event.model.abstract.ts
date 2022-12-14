import { Column } from 'typeorm';
import { AbstractTypeOrmModel } from './typeorm.model.abstract';

export class AbstractEventModel extends AbstractTypeOrmModel {
  @Column()
  name: string;

  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column('simple-json')
  data: string;
}
