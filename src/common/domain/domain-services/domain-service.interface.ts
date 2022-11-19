export interface IDomainService<Props, Response> {
  execute(props: Props): Promise<Response>;
}
