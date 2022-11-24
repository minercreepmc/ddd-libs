import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';

export interface BaseEntityProps {
  id: ID;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface IEntity<EntityProps> {
  equals(object: IEntity<EntityProps>): boolean;
  getPropsCopy(): EntityProps;
  toObject(): BaseEntityProps & EntityProps;
}
