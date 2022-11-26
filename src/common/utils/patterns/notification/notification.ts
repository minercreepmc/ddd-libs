export class Notification {
  private errors: NotificationError[] = [];

  addError(message: string, cause?: Error): void {
    this.errors.push(new NotificationError(message, cause));
  }

  hasError(): boolean {
    return !(this.errors.length === 0);
  }
}

class NotificationError {
  constructor(readonly message: string, readonly cause: Error) {}
}
