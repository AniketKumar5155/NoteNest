import { useEffect } from "react";
// import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import { useNotes } from "../context/NoteContext";
import useDebounce from "../hooks/useDebounce";
import Fuse from "fuse.js";

const Main = ({
  filter = "active",
  sortBy = "createdAt",
  sortOrder = "desc",
  categoryName,
}) => {
  const {
    notes,
    loading,
    searchQuery,
    getFilteredSortedNotes,
    getAllDeletedFilteredSortedNotes,
    getAllArchivedFilteredSortedNotes,
  } = useNotes();

  const debouncedSearch = useDebounce(searchQuery, 300);

  const fuse = new Fuse(notes, {
    keys: ["title", "content"],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    includeMatches: true,
  });

  const notesToRender = debouncedSearch.trim()
    ? fuse.search(debouncedSearch)
      .sort((a, b) => a.score - b.score)
      .map(result => result.item)
    : notes;



  // const visibleNotes = notes.filter(note =>
  //   note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   note.content.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const notesToRender = debouncedSearch.trim()
  //   ? visibleNotes
  //   : notes;


  useEffect(() => {
    const filters = {
      sortBy,
      order: sortOrder,
    };

    if (filter === "deleted") {
      getAllDeletedFilteredSortedNotes(filters);
    } else if (filter === "archived") {
      getAllArchivedFilteredSortedNotes(filters);
    } else if (categoryName) {
      getFilteredSortedNotes({ ...filters, category: categoryName });
    } else {
      getFilteredSortedNotes({...filters});
    }
  }, [filter, sortBy, sortOrder, categoryName]);

  return (
    <div className="flex-1 relative overflow-y-auto gap-1 flex flex-col pt-1 pb-36 bg-[#ffefad] min-h-screen ">
      {loading ? (
        <p className="text-center text-gray-600">Loading notes...</p>
      ) : notesToRender.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        notesToRender.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            filter={filter}
          />
        ))
      )}
    </div>
  );
};

export default Main;
