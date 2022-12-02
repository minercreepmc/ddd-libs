export interface IDomainService<Details, Response> {
  execute(details: Details): Promise<Response>;
}
