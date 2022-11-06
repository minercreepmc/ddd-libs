export interface IUseCase<RequestDTO, ResponseDTO> {
  execute(dto?: RequestDTO): Promise<ResponseDTO>;
}
