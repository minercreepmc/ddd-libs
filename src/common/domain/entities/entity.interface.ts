import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';

export interface IBaseEntity {
  id: ID;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface IEntity<EntityDetails> {
  equals(object: any): boolean;
  getDetailsCopy(): EntityDetails;
  toObject(): IBaseEntity & EntityDetails;
}

export interface ICreateEntity<Details> {
  id: ID;
  details: Details;
}
