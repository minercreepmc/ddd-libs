export class AbstractResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AbstractResponseDto) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
