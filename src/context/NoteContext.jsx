import { createContext, useContext, useState, useEffect } from "react";
import {
    getAllNotesService,
    getNoteByIdService,
    createNoteService,
    updateNoteService,
    SoftDeleteNoteService,
    getAllSoftDeletedNotesService,
    getAllArchivedNotesService,
    restoreSoftDeletedNoteService,
    archiveNoteService,
    deleteNoteService,
    restoreDeletedNoteService,
    unarchiveNoteService,
    getFilteredSortedNotesService
} from "../service/noteService";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const { user } = useAuth()
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const data = await getAllNotesService();
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
            toast.error("Failed to transfer note to bin")
        }
    }

    const getAllSoftDeletedNotes = async () => {
        try {
            setLoading(true)
            const data = await getAllSoftDeletedNotesService();
            setNotes(data)
        }catch (error) {
            toast.error("Failed to fetch notes");
        }finally {
            setLoading(false)
        }
    }

    const getAllArchivedNotes = async () => {
        try {
            setLoading(true);
            const data = await getAllArchivedNotesService();
            setNotes(data);
        }catch (error) {
            toast.error("Failed to fetch archived notes");
        }finally {
            setLoading(false);
        }   
    }

    const restoreSoftDeletedNote = async (id) => {
        try {
            await restoreSoftDeletedNoteService(id);
            fetchNotes();
        } catch (error) {
            toast.error("Failed to restore note");
        }
    };

    const archiveNote = async (id) => {
        try {
            await archiveNoteService(id);      
            fetchNotes();
        }catch (error) {
            toast.error("Failed to archive note");
        }
    }

    const unarchiveNote = async (id) => {
        try {
            await unarchiveNoteService(id);
            getAllArchivedNotes();
        }catch (error) {
            toast.error("Failed to unarchive note");
        }
    }

    const deleteNote = async (id) => {
        try {
            await deleteNoteService(id);
            getAllSoftDeletedNotes();
        }catch (error) {
            toast.error("Failed to delete note");   
        }
    }

    const restoreDeletedNote = async (id) => {
        try {  
            await restoreDeletedNoteService(id);
            getAllSoftDeletedNotes();
        }catch (error) {
            toast.error("Failed to restore deleted note");
        }
    };

    const getFilteredSortedNotes = async (filters) => {
        try {
            setLoading(true);
            const data = await getFilteredSortedNotesService(filters);
            setNotes(data);
        } catch (error) {
            toast.error("Failed to fetch filtered notes");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        if(user){
            fetchNotes();
        }
    }, [user]);


    return (
        <NoteContext.Provider
            value={{
                notes,
                loading,
                fetchNotes,
                createNote,
                updateNote,
                getNoteById,
                softDeleteNote,
                getAllSoftDeletedNotes,
                getAllArchivedNotes,
                restoreSoftDeletedNote,
                archiveNote,
                deleteNote,
                restoreDeletedNote,
                unarchiveNote,
                getFilteredSortedNotes,
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
