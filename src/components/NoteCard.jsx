import { MdDelete, MdRestore, MdUnarchive, MdArchive } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useNotes } from "../context/NoteContext";
import { toast } from "react-toastify";
import { useState } from "react";

const NoteCard = ({ id, title }) => {
  const {
    softDeleteNote,
    deleteNote,
    restoreDeletedNote,
    unarchiveNote,
    archiveNote,
  } = useNotes();
  const location = useLocation();

  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const noteStatus = () => {
    if (location.pathname.includes("bin")) return "deleted";
    if (location.pathname.includes("archive")) return "archived";
    return "active";
  };

  const status = noteStatus();

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (status === "active" || status === "archived") {
        await softDeleteNote(id);
        toast.success("Note has been moved to the bin.");
      } else if (status === "deleted") {
        await deleteNote(id);
        toast.success("Note has been permanently deleted.");
        setConfirmingDeleteId(null);
      }
    } catch (error) {
      // Optionally log to a monitoring service if needed
      toast.error("Unable to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await restoreDeletedNote(id);
      toast.success("Note has been restored successfully.");
    } catch (error) {
      // Optionally log to a monitoring service if needed
      toast.error("Unable to restore note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await unarchiveNote(id);
      toast.success("Note has been unarchived successfully.");
    } catch (error) {
      // Optionally log to a monitoring service if needed
      toast.error("Unable to unarchive note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await archiveNote(id);
      toast.success("Note has been archived successfully.");
    } catch (error) {
      // Optionally log to a monitoring service if needed
      toast.error("Unable to archive note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-between items-center p-4 bg-amber-300 rounded shadow mx-5 hover:bg-amber-400 transition-colors">
      <Link to={`/note/${id}`} className="flex-1">
        <p className="text-lg font-medium break-all whitespace-normal">
          {title}
        </p>
      </Link>

      {status === "deleted" && (
        <MdRestore
          onClick={!loading ? handleRestore : undefined}
          className={`text-green-600 hover:text-green-700 cursor-pointer text-xl ml-4 ${
            loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
          title="Restore Note"
        />
      )}

      {status === "archived" && (
        <MdUnarchive
          onClick={!loading ? handleUnarchive : undefined}
          className={`text-blue-600 hover:text-blue-700 cursor-pointer text-xl ml-4 ${
            loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
          title="Unarchive Note"
        />
      )}

      {status === "active" && (
        <MdArchive
          onClick={!loading ? handleArchive : undefined}
          className={`text-blue-600 hover:text-blue-700 cursor-pointer text-xl ml-4 ${
            loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
          }`}
          title="Archive Note"
        />
      )}

      <MdDelete
        onClick={() => {
          if (loading) return;
          if (status === "deleted") {
            setConfirmingDeleteId(id);
          } else {
            handleDelete();
          }
        }}
        className={`text-red-500 hover:text-red-600 cursor-pointer text-xl ml-4 ${
          loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded"
              disabled={loading}
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
