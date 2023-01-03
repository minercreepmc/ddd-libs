export abstract class ReadModel {
  readonly id: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
  constructor({ id, createdAt, updatedAt }: ReadModel) {
    this.id = id;
    this.createdAt = createdAt || new Date(Date.now());
    this.updatedAt = updatedAt || new Date(Date.now());
  }
}
