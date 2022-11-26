export class Notification<NoteType> {
  private noteList: NoteType[] = [];

  addError(note: NoteType): void {
    this.noteList.push(note);
  }

  hasError(): boolean {
    return !(this.noteList.length === 0);
  }
}
