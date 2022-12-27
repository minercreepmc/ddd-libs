import { Notification } from './notification';

export abstract class AbstractNotificationWrapper<NoteType> {
  private readonly note = new Notification<NoteType>();
  isValid() {
    return !this.note.hasNote();
  }

  get errors() {
    return this.note.getNotes();
  }
}
