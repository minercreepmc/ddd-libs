import { Guard } from '@core/guard';
import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';

export interface BaseEntityProps {
  id: ID;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface CreateEntityProps<T> {
  id: ID;
  props: T;
  createdAt?: DateVO;
  updatedAt?: DateVO;
}

export abstract class Entity<EntityProps> implements Guard<void> {
  protected abstract _id: ID;
  private readonly _createdAt: DateVO;
  protected _updatedAt: DateVO;
  protected readonly props: EntityProps;

  public abstract guard(): void;

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  /**
   *  Check if two entities are the same Entity. Checks using ID field.
   * @param object Entity
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public getPropsCopy(): EntityProps {
    const propsCopy = {
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }

  public toObject(): BaseEntityProps & EntityProps {
    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(result);
  }

  protected constructor({ id, props }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    const now = DateVO.now();
    this._createdAt = now;
    this._updatedAt = now;
    this.props = props;
  }

  private setId(id: ID): void {
    this._id = id;
  }
}
