import { ID } from './id.value-object';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { ArgumentInvalidException } from 'ts-common-exceptions';

export class UUID extends ID {
  constructor(id?: string) {
    if (id && !UUID.isValid(id))
      throw new ArgumentInvalidException('Invalid uuid');
    super(id ? id : uuidV4());
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
