import { useEffect } from "react";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import { useNotes } from "../context/NoteContext";

const Main = ({ filter = "active" }) => {
  const {
    notes,
    loading,
    fetchNotes,
    getAllSoftDeletedNotes,
    getAllArchivedNotes,
  } = useNotes();

  useEffect(() => {
    if (filter === "deleted") {
      getAllSoftDeletedNotes();
    }
    else if (filter === "archived") {
      getAllArchivedNotes();
    }
    else {
      fetchNotes();
    }
  }, [filter]);

  return (
<div className="gap-1 flex flex-col pt-1 pb-1 bg-[#ffefad]">
      {loading ? (
        <p className="text-center text-gray-600">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            filter={filter}
          />
        ))
      )}
      {filter === "active" && <AddNote />}
    </div>
  );
};

export default Main;
