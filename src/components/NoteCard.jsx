import { MdDelete, MdRestore, MdUnarchive, MdArchive } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useNotes } from "../context/NoteContext";
import { toast } from "react-toastify";
import { useState } from "react";

const NoteCard = ({ id, title }) => {
  const { softDeleteNote, deleteNote, restoreDeletedNote, unarchiveNote, archiveNote } = useNotes();
  const location = useLocation();

  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

  const noteStatus = () => {
    if (location.pathname.includes("bin")) return "deleted";
    if (location.pathname.includes("archive")) return "archived";
    return "active";
  };

  const status = noteStatus();

  const handleDelete = async () => {
    try {
      if (status === "active" || status === "archived") {
        await softDeleteNote(id);
        toast.success("Note moved to Bin");
      } else if (status === "deleted") {
        await deleteNote(id);
        toast.success("Note permanently deleted");
        setConfirmingDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  const handleRestore = async () => {
    try {
      await restoreDeletedNote(id);
      toast.success("Note restored successfully");
    } catch (error) {
      console.error("Error restoring note:", error);
      toast.error("Failed to restore note");
    }
  };

  const handleUnarchive = async () => {
    try {
      await unarchiveNote(id);
      toast.success("Note unarchived successfully");
    } catch (error) {
      console.error("Error unarchiving note:", error);
      toast.error("Failed to unarchive note");
    }
  };

  const handleArchive = async () => {
    try {
      await archiveNote(id);
      toast.success("Note archived successfully");
    } catch (error) {
      console.error("Error archiving note:", error);
      toast.error("Failed to archive note");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex justify-between items-center p-4 bg-amber-300 rounded shadow mx-5 hover:bg-amber-400 transition-colors">
      <Link to={`/note/${id}`} className="flex-1">
        <p className="text-lg font-medium break-all whitespace-normal">
          {title}
        </p>
      </Link>

      {status === "deleted" && (
        <MdRestore
          onClick={handleRestore}
          className="text-green-600 hover:text-green-700 cursor-pointer text-xl ml-4"
          title="Restore Note"
        />
      )}

      {status === "archived" && (
        <MdUnarchive
          onClick={handleUnarchive}
          className="text-blue-600 hover:text-blue-700 cursor-pointer text-xl ml-4"
          title="Unarchive Note"
        />
      )}

      {status === "active" && (
        <MdArchive
          onClick={handleArchive}
          className="text-blue-600 hover:text-blue-700 cursor-pointer text-xl ml-4"
          title="Unarchive Note"
        />
      )}


      <MdDelete
        onClick={() => {
          if (status === "deleted") {
            setConfirmingDeleteId(id);
          } else {
            handleDelete();
          }
        }}
        className="text-red-500 hover:text-red-600 cursor-pointer text-xl ml-4"
        title={status === "deleted" ? "Permanently Delete" : "Move to Bin"}
      />

      {confirmingDeleteId === id && (
        <div className="absolute top-16 right-5 bg-white shadow-md border p-3 rounded z-50 w-64">
          <p className="text-sm text-gray-800 font-medium mb-2">
            Permanently delete this note?
            <div>Title: {title}</div>

          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setConfirmingDeleteId(null)}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
