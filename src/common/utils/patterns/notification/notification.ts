export class Notification<NoteType> {
  private noteList: NoteType[] = [];

  addNote(note: NoteType): void {
    this.noteList.push(note);
  }

  hasNote(): boolean {
    return !(this.noteList.length === 0);
  }

  getNotes(): NoteType[] {
    return this.noteList;
  }

  clearNote() {
    this.noteList = [];
  }
}
