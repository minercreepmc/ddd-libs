import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';
import { IBaseEntity, ICreateEntity, IEntity } from './entity.interface';

export abstract class AbstractEntity<EntityDetails>
  implements IEntity<EntityDetails>
{
  readonly id: ID;
  readonly createdAt: DateVO;
  updatedAt: DateVO;
  readonly details: EntityDetails;
/**
   *  Check if two entities are the same Entity. Checks using ID field.
   * @param object Entity
   */
  equals(object: AbstractEntity<EntityDetails>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!AbstractEntity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  static isEntity(entity: unknown): entity is AbstractEntity<unknown> {
    return entity instanceof AbstractEntity;
  }

  public getDetailsCopy(): EntityDetails {
    const detailsCopy = {
      ...this.details,
    };

    return Object.freeze(detailsCopy);
  }

  public toObject(): IBaseEntity & EntityDetails {
    const result = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.details,
    };

    return Object.freeze(result);
  }

  protected applyUpdatedAt(date: DateVO) {
    this.updatedAt = date;
  }

  protected constructor({ id, details }: ICreateEntity<EntityDetails>) {
    this.id = id;
    this.createdAt = DateVO.now();
    this.updatedAt = DateVO.now();
    this.details = details;
  }
}
