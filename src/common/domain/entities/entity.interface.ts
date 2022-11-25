import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';

export interface IBaseEntity {
  id: ID;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface IEntity<EntityProps> {
  equals(object: IEntity<EntityProps>): boolean;
  getPropsCopy(): EntityProps;
  toObject(): IBaseEntity & EntityProps;
}
