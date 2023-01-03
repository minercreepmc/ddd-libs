export abstract class AbstractReadModel {
  readonly id: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
  constructor({ id, createdAt, updatedAt }: AbstractReadModel) {
    this.id = id;
    this.createdAt = createdAt || new Date(Date.now());
    this.updatedAt = updatedAt || new Date(Date.now());
  }
}
