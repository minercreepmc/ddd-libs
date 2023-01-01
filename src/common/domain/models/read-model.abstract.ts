export interface IReadModelData {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  details: any;
}

export abstract class ReadModel {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
  readonly details: any;
  constructor({ id, details, createdAt, updatedAt }: IReadModelData) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.details = details;
  }
}
