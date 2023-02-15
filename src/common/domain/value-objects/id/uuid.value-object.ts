import { ID } from './id.value-object';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { ArgumentInvalidExeception } from 'ts-common-exceptions';

export class UUID extends ID {
  static create(id?: string): UUID {
    if (id && !this.isValid(id))
      throw new ArgumentInvalidException('Invalid uuid');
    const uuid = new UUID(id ? id : uuidV4());
    return uuid;
  }

  static isValid(candidate: string | UUID): boolean {
    let candidateFormetted: string;
    if (typeof candidate === 'string') {
      candidateFormetted = candidate.trim();
    } else if (candidate instanceof UUID) {
      candidateFormetted = candidate.unpack();
    } else {
      return false;
    }
    return uuidValidate(candidateFormetted);
  }
}
