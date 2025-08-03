import { useEffect } from "react";
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
    ? fuse
        .search(debouncedSearch)
        .sort((a, b) => a.score - b.score)
        .map((result) => result.item)
    : notes;

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
      getFilteredSortedNotes({ ...filters });
    }
  }, [filter, sortBy, sortOrder, categoryName]);

  return (
    <div className="flex-1 relative overflow-y-auto bg-[#ffefad] min-h-screen pb-30 pt-2 px-2">
      {loading ? (
        <p className="text-center text-gray-600">Loading notes...</p>
      ) : notesToRender.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div
          className="grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-1 
            xl:grid-cols-1 
            gap-2"
        >
          {notesToRender.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              color={note.color}
              shade={note.shade}
              filter={filter}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
