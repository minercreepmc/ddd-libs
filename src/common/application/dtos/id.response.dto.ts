export interface Id {
  id: string;
}

export class IdResponse implements Id {
  constructor(public readonly id: string) {}
}
