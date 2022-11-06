export interface UseCase<RequestDTO, ResponseDTO> {
  execute(dto?: RequestDTO): Promise<ResponseDTO>;
}
