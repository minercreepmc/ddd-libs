import { Notification } from './notification';

export abstract class AbstractNotificationWrapper<NoteType> {
  protected readonly note = new Notification<NoteType>();
  abstract check(candidate: any): void | Promise<void>;
  isValid() {
    return !this.note.hasNote();
  }

  clearNote(): void {
    this.note.clearNote();
  }

  get errors() {
    return this.note.getNotes();
  }
}
