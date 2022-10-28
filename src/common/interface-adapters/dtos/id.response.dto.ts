import { Id } from '../interface/id.interface';

export class IdResponse implements Id {
  constructor(public readonly id: string) {}
}
