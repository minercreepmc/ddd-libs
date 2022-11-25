import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';
import { IBaseEntity, IEntity } from './entity.interface';

export interface ICreateEntity<EntityProps> {
  id: ID;
  props: EntityProps;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export abstract class AbstractEntity<EntityProps>
  implements IEntity<EntityProps>
{
  protected _id: ID;
  private readonly _createdAt: DateVO;
  protected _updatedAt: DateVO;
  protected readonly props: EntityProps;

  get id(): ID {
    return this._id;
  }

  get createdAt(): DateVO {
    return this._createdAt;
  }

  get updatedAt(): DateVO {
    return this._updatedAt;
  }

  /**
   *  Check if two entities are the same Entity. Checks using ID field.
   * @param object Entity
   */
  equals(object?: AbstractEntity<EntityProps>): boolean {
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

  public getPropsCopy(): EntityProps {
    const propsCopy = {
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }

  public toObject(): IBaseEntity & EntityProps {
    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(result);
  }

  protected constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: ICreateEntity<EntityProps>) {
    this.setId(id);
    this._createdAt = createdAt || DateVO.now();
    this._updatedAt = updatedAt || DateVO.now();
    this.props = props;
  }

  private setId(id: ID): void {
    this._id = id;
  }
}
