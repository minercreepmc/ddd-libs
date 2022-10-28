export interface Exception {
  code: string;
  toJSON(): SerializedExeption;
}

export interface SerializedExeption {
  message: string;
  code: string;
  stack?: string;
  metadata?: unknown;
}
