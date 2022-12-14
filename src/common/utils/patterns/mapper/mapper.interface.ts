export interface ToPersistent<DomainEntity, PersistentObject> {
  toPersistent(domain: DomainEntity): PersistentObject;
}

export interface FromPersistentToDomain<PersistentObject, DomainEntity> {
  toDomain(persistentObject: PersistentObject): DomainEntity;
}

export interface FromDTOToDomain<DTO, DomainEntity> {
  toDomain(dto: DTO): DomainEntity;
}

export interface PersistentMapper<DomainEntity, PersistentObject>
  extends ToPersistent<DomainEntity, PersistentObject>,
    FromPersistentToDomain<PersistentObject, DomainEntity> {}
