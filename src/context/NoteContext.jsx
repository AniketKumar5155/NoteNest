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

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const data = await getFilteredSortedNotesService(filters);
            setNotes(data);
        } catch (err) {
            toast.error("Failed to load notes");
        } finally {
            setLoading(false);
        }
    };

    const createNote = async ({ title, content }) => {
        try {
            await createNoteService({ title, content });
            fetchNotes();
        } catch (err) {
            toast.error("Failed to create note");
        }
    };

    const updateNote = async (id, updatedData) => {
        try {
            await updateNoteService(id, updatedData);
            fetchNotes();
        } catch (err) {
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
            fetchNotes();
        } catch (error) {
            toast.error("Failed to transfer note to bin");
        }
    };

    const getAllDeletedFilteredSortedNotes = async ({ sortBy = "deleted_at", order = "DESC" } = {}) => {
        try {
            setLoading(true);
            const data = await getAllDeletedFilteredSortedNotesService({ sortBy, order });
            setNotes(data);
        } catch (error) {
            toast.error("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    };

    const getAllArchivedFilteredSortedNotes = async ({ sortBy = "updated_at", order = "DESC" } = {}) => {
        try {
            setLoading(true);
            const data = await getAllArchivedFilteredSortedNotesService({ sortBy, order });
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
            getAllDeletedFilteredSortedNotes();
        } catch (error) {
            toast.error("Failed to restore note");
        }
    };

    const archiveNote = async (id) => {
        try {
            await archiveNoteService(id);
            fetchNotes();
        } catch (error) {
            toast.error("Failed to archive note");
        }
    };

    const unarchiveNote = async (id) => {
        try {
            await unarchiveNoteService(id);
            getAllArchivedFilteredSortedNotes();
        } catch (error) {
            toast.error("Failed to unarchive note");
        }
    };

    const deleteNote = async (id) => {
        try {
            await deleteNoteService(id);
            getAllDeletedFilteredSortedNotes();
        } catch (error) {
            toast.error("Failed to delete note");
        }
    };

    const restoreDeletedNote = async (id) => {
        try {
            await restoreDeletedNoteService(id);
            getAllDeletedFilteredSortedNotes();
        } catch (error) {
            toast.error("Failed to restore deleted note");
        }
    };

    const getFilteredSortedNotes = async ({ sortBy = "created_at", order = "DESC", category, is_pinned }) => {
        try {
            setLoading(true);
            const data = await getFilteredSortedNotesService({ sortBy, order, category, is_pinned });
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
    }

    const updateCatgory = async (id, name) => {
        try {
            const updatedCategory = await updateCategoryService(id, name);
            setCategories((prev) => prev.map(cat => cat.id === id ? updatedCategory : cat));
        } catch (error) {
            toast.error("Failed to update category");
        }
    }

    const getAllActiveCategories = async () => {
        try {
            const data = await getAllActiveCategoriesService();
            console.log("context,", data)
            setCategories(data);
            console.log(categories)
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    }

    useEffect(() => {
        if (user) {
            fetchNotes();
            getAllActiveCategories();
        }
    }, [user, filters]);

    return (
        <NoteContext.Provider
            value={{
                notes,
                loading,
                categories,
                fetchNotes,
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
