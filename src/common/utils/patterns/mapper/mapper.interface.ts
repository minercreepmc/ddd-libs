import { MapperPlugin } from './mapper.plugin';

export interface PersistentMapper<DomainEntity, PersistentObject>
  extends MapperPlugin.ToPersistent<DomainEntity, PersistentObject>,
    MapperPlugin.FromPersistentToDomain<PersistentObject, DomainEntity> {}

export interface OrchestrateMapper<DomainEntity, RequestDTO, ResponseDTO>
  extends MapperPlugin.FromRequestDTOToDomain<RequestDTO, DomainEntity>,
    MapperPlugin.FromDomainToResponseDTO<DomainEntity, ResponseDTO> {}
