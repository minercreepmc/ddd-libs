import { ID } from './id.value-object';
import { ArgumentInvalidExeception } from '@tinphamm/common-exceptions';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';

export class UUID extends ID {
  public static create(id?: string): UUID {
    const uuid = new UUID(id ? id : uuidV4());
    return uuid;
  }

  public guard() {
    if (!UUID.isValid(this)) {
      throw new ArgumentInvalidExeception('UUID was not valid');
    }
  }

  public static isValid(candidate: string | UUID) {
    let candidateFormetted: string;
    if (typeof candidate === 'string') {
      candidateFormetted = candidate.trim();
    } else if (candidate instanceof UUID) {
      candidateFormetted = candidate.value;
    } else {
      return false;
    }
    return uuidValidate(candidateFormetted);
  }
}
