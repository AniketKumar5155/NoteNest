import { useEffect } from "react";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import { useNotes } from "../context/NoteContext";

const Main = ({ filter = "active" }) => {
  const {
    notes,
    loading,
    getFilteredSortedNotes,
    getAllSoftDeletedNotes,
    getAllArchivedNotes,
  } = useNotes();

  useEffect(() => {
    if (filter === "deleted") {
      getAllSoftDeletedNotes();
    } else if (filter === "archived") {
      getAllArchivedNotes();
    } else {
      const storedFilters = JSON.parse(localStorage.getItem("noteFilters")) || {};
      getFilteredSortedNotes(storedFilters);
    }
  }, [filter]);

  return (
    <>
    <div className="flex-1 overflow-y-auto gap-1 flex flex-col pt-1 pb-1 bg-[#ffefad] min-h-[calc(100vh-130px)] ">
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
    </>
  );
};

export default Main;
