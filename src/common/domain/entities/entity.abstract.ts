import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';
import { IBaseEntity, IEntityData, IEntity } from './entity.interface';

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
  equals(object: any): boolean {
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

  static isEntity(obj: unknown): obj is AbstractEntity<unknown> {
    return (
      obj !== null &&
      obj !== undefined &&
      typeof (obj as any).toObject === 'function' &&
      (obj as any).id !== undefined
    );
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

  constructor({ id, details }: IEntityData<EntityDetails>) {
    this.id = id;
    this.createdAt = DateVO.now();
    this.updatedAt = DateVO.now();
    this.details = details;
  }
}
