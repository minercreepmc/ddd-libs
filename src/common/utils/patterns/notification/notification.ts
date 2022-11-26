export class Notification {
  private errors: Error[] = [];

  addError(cause: Error): void {
    this.errors.push(cause);
  }

  hasError(): boolean {
    return !(this.errors.length === 0);
  }
}
