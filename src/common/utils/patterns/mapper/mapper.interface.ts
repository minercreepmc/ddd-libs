import { MapperPlugin } from './mapper.plugin';

export interface PersistentMapper<DomainEntity, PersistentObject>
  extends MapperPlugin.ToPersistent<DomainEntity, PersistentObject>,
    MapperPlugin.FromPersistentToDomain<PersistentObject, DomainEntity> {}

export interface OrchestrateMapper<DomainEntity, RequestDTO, ResponseDTO>
  extends MapperPlugin.FromRequestDTOToDomain<RequestDTO, DomainEntity>,
    MapperPlugin.FromDomainToResponseDTO<unknown, ResponseDTO> {}

export interface DomainMapper<DomainEntity, ResponseDTO>
  extends MapperPlugin.FromDomainToResponseDTO<DomainEntity, ResponseDTO> {}

export interface MessageMapper<DomainEvent, Message>
  extends MapperPlugin.FromDomainEventToMessage<DomainEvent, Message> {}
