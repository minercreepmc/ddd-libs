export namespace MapperPlugin {
  export interface ToPersistent<DomainEntity, PersistentObject> {
    toPersistent(domain: DomainEntity): PersistentObject;
  }

  export interface FromPersistentToDomain<PersistentObject, DomainEntity> {
    toDomain(persistentObject: PersistentObject): DomainEntity;
  }

  export interface FromRequestDTOToDomain<RequestDTO, DomainEntity> {
    toDomain(dto: RequestDTO): Promise<DomainEntity>;
  }

  export interface FromDomainToResponseDTO<DomainEntity, ResponseDTO> {
    toResponseDTO(domain: DomainEntity): ResponseDTO;
  }
}
