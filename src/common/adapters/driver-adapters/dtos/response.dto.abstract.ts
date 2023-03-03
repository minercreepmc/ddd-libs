export class AbstractResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(options: AbstractResponseDto) {
    this.id = options.id;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
  }
}
