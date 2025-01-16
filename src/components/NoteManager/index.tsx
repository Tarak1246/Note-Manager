import React, { useState } from 'react';
import { Note } from '../../types/Note';
import NoteForm from '../NoteForm';
import NoteTable from '../NoteTable';

const NoteManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const handleAddOrUpdateNote = (note: Note) => {
    if (noteToEdit) {
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === noteToEdit.id ? note : n))
      );
      setNoteToEdit(null);
    } else {
      setNotes([...notes, { ...note, id: Date.now() }]);
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note: Note) => {
    setNoteToEdit(note);
  };

  return (
    <div className="layout-column align-items-center justify-content-start" data-testid="note-manager">
      <NoteForm onSubmit={handleAddOrUpdateNote} noteToEdit={noteToEdit || undefined} />
      <NoteTable notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
    </div>
  );
};

export default NoteManager;
