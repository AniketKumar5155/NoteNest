import { createContext, useContext, useState, useEffect } from "react";
import {
  getNoteByIdService,
  createNoteService,
  updateNoteService,
  SoftDeleteNoteService,
  getAllArchivedFilteredSortedNotesService,
  restoreSoftDeletedNoteService,
  archiveNoteService,
  deleteNoteService,
  restoreDeletedNoteService,
  unarchiveNoteService,
  getFilteredSortedNotesService,
  createCategoryService,
  getAllActiveCategoriesService,
  updateCategoryService,
  getAllDeletedFilteredSortedNotesService,
} from "../service/noteService";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ sortBy: "created_at", order: "DESC" });
  const [searchQuery, setSearchQuery] = useState("");
  const [lastFilters, setLastFilters] = useState({});
  const [selectedNote, setSelectedNote] = useState(null)

  const createNote = async ({ title, content }) => {
    try {
      await createNoteService({ title, content });
      getFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to create note");
    }
  };

  const updateNote = async (id, updatedData) => {
    try {
      await updateNoteService(id, updatedData);
      getFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  const getNoteById = async (id) => {
    try {
      return await getNoteByIdService(id);
    } catch (err) {
      toast.error("Failed to get note");
    }
  };

  const softDeleteNote = async (id) => {
    try {
      await SoftDeleteNoteService(id);
      getFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to transfer note to bin");
    }
  };

  const getAllDeletedFilteredSortedNotes = async (filters = lastFilters) => {
    const {
      sortBy = "deleted_at",
      order = "DESC",
      category,
      is_pinned,
      is_deleted = true,
      is_archived = false,
    } = filters;

    const finalFilters = { sortBy, order, category, is_pinned, is_archived, is_deleted };

    setLastFilters(finalFilters);
    try {
      setLoading(true);
      const data = await getAllDeletedFilteredSortedNotesService(finalFilters);
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const getAllArchivedFilteredSortedNotes = async (filters = lastFilters) => {
    const {
      sortBy = "updated_at",
      order = "DESC",
      category,
      is_pinned,
      is_deleted = false,
      is_archived = true,
    } = filters;

    const finalFilters = { sortBy, order, category, is_pinned, is_archived, is_deleted };

    setLastFilters(finalFilters);
    try {
      setLoading(true);
      const data = await getAllArchivedFilteredSortedNotesService(finalFilters);
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch archived notes");
    } finally {
      setLoading(false);
    }
  };

  const restoreSoftDeletedNote = async (id) => {
    try {
      await restoreSoftDeletedNoteService(id);
      getAllDeletedFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to restore note");
    }
  };

  const archiveNote = async (id) => {
    try {
      await archiveNoteService(id);
      getFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to archive note");
    }
  };

  const unarchiveNote = async (id) => {
    try {
      await unarchiveNoteService(id);
      await getAllArchivedFilteredSortedNotes({
        ...lastFilters,
        is_archived: true,
        is_deleted: false,
      });
    } catch (error) {
      toast.error("Failed to unarchive note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteService(id);
      getAllDeletedFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const restoreDeletedNote = async (id) => {
    try {
      await restoreDeletedNoteService(id);
      getAllDeletedFilteredSortedNotes(lastFilters);
    } catch (error) {
      toast.error("Failed to restore deleted note");
    }
  };

  const getFilteredSortedNotes = async (filters = lastFilters) => {
    const {
      sortBy = "created_at",
      order = "DESC",
      category,
      is_pinned,
    } = filters;

    const finalFilters = { sortBy, order, category, is_pinned };

    setLastFilters(finalFilters);
    try {
      setLoading(true);
      const data = await getFilteredSortedNotesService(finalFilters);
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch filtered notes");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name) => {
    try {
      const newCategory = await createCategoryService(name);
      setCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  const updateCatgory = async (id, name) => {
    try {
      const updatedCategory = await updateCategoryService(id, name);
      setCategories((prev) => prev.map((cat) => (cat.id === id ? updatedCategory : cat)));
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const getAllActiveCategories = async () => {
    try {
      const data = await getAllActiveCategoriesService();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const selectNote = () => {
    const note = (notes.find(note => note.id === id))
    setSelectedNote(note || null)
  }

  useEffect(() => {
    if (user) {
      getFilteredSortedNotes(filters);
      getAllActiveCategories();
    }
  }, [user, filters]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        categories,
        createNote,
        updateNote,
        getNoteById,
        softDeleteNote,
        getAllDeletedFilteredSortedNotes,
        getAllArchivedFilteredSortedNotes,
        restoreSoftDeletedNote,
        archiveNote,
        deleteNote,
        restoreDeletedNote,
        unarchiveNote,
        getFilteredSortedNotes,
        createCategory,
        getAllActiveCategories,
        updateCatgory,
        searchQuery,
        setSearchQuery,
        selectedNote,
        setSelectedNote,
        selectNote
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within NoteProvider");
  }
  return context;
};
