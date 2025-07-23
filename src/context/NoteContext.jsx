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
            toast.error("Unable to load notes. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const createNote = async ({ title, content }) => {
        try {
            await createNoteService({ title, content });
            fetchNotes();
        } catch (err) {
            toast.error("Unable to create note. Please try again.");
        }
    };


    const updateNote = async (id, updatedData) => {
        try {
            await updateNoteService(id, updatedData);
            fetchNotes();
        } catch (err) {
            toast.error("Unable to update note. Please try again.");
        }
    };

    const getNoteById = async (id) => {
        try {
            return await getNoteByIdService(id);
        } catch (err) {
            toast.error("Unable to retrieve note. Please try again.");
        }
    };

    const softDeleteNote = async (id) => {
        try {
            await SoftDeleteNoteService(id);
            fetchNotes();
        } catch (error) {
            toast.error("Unable to move note to bin. Please try again.")
        }
    }

    const getAllSoftDeletedNotes = async () => {
        try {
            setLoading(true)
            const data = await getAllSoftDeletedNotesService();
            setNotes(data)
        }catch (error) {
            toast.error("Unable to fetch notes from bin. Please try again.");
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
            toast.error("Unable to fetch archived notes. Please try again.");
        }finally {
            setLoading(false);
        }   
    }

    const restoreSoftDeletedNote = async (id) => {
        try {
            await restoreSoftDeletedNoteService(id);
            fetchNotes();
        } catch (error) {
            toast.error("Unable to restore note. Please try again.");
        }
    };

    const archiveNote = async (id) => {
        try {
            await archiveNoteService(id);      
            fetchNotes();
        }catch (error) {
            toast.error("Unable to archive note. Please try again.");
        }
    }

    const unarchiveNote = async (id) => {
        try {
            await unarchiveNoteService(id);
            getAllArchivedNotes();
        }catch (error) {
            toast.error("Unable to unarchive note. Please try again.");
        }
    }

    const deleteNote = async (id) => {
        try {
            await deleteNoteService(id);
            getAllSoftDeletedNotes();
        }catch (error) {
            toast.error("Unable to delete note. Please try again.");   
        }
    }

    const restoreDeletedNote = async (id) => {
        try {  
            await restoreDeletedNoteService(id);
            getAllSoftDeletedNotes();
        }catch (error) {
            toast.error("Unable to restore deleted note. Please try again.");
        }
    };

    const getFilteredSortedNotes = async (filters) => {
        try {
            setLoading(true);
            const data = await getFilteredSortedNotesService(filters);
            setNotes(data);
        } catch (error) {
            toast.error("Unable to fetch filtered notes. Please try again.");
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
