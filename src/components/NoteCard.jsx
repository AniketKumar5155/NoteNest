import { MdDelete, MdRestore, MdUnarchive, MdArchive } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotes } from "../context/NoteContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import CategoryModal from "./CategoryModal";
import useMediaQuery from "../hooks/useMediaQuery";
import ColorModal from "./ColorModal";

const NoteCard = ({ id, title, color, shade }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();

  const {
    softDeleteNote,
    deleteNote,
    restoreDeletedNote,
    unarchiveNote,
    archiveNote,
  } = useNotes();

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

  const handleThreeDotMenu = () => setIsOpen(!isOpen);

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
        toast.success("Note moved to Bin");
      } else if (status === "deleted") {
        await deleteNote(id);
        toast.success("Note permanently deleted");
        setConfirmingDeleteId(null);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Something went wrong while deleting");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await restoreDeletedNote(id);
      toast.success("Note restored successfully");
    } catch (error) {
      console.error("Error restoring note:", error);
      toast.error("Failed to restore note");
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await unarchiveNote(id);
      toast.success("Note unarchived successfully");
    } catch (error) {
      console.error("Error unarchiving note:", error);
      toast.error("Failed to unarchive note");
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await archiveNote(id);
      toast.success("Note archived successfully");
    } catch (error) {
      console.error("Error archiving note:", error);
      toast.error("Failed to archive note");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteClick = () => {
    const path = location.pathname;

    if (isDesktop) {
      if (path.startsWith("/archive")) {
        navigate(`/archive/notes/${id}`);
      } else if (path.startsWith("/bin")) {
        navigate(`/bin/notes/${id}`);
      } else if (path.startsWith("/note/category")) {
        const [_, __, ___, categoryName] = path.split("/");
        navigate(`/note/category/${categoryName}/${id}`);

      } else {
        navigate(`/notes/${id}`);
      }
    } else {
      navigate(`/note/${id}`);
    }
  };

  const bgColorClass = `bg-${color}-${shade}`;
  const hoverClass = `hover:bg-${color}-${Math.min(+shade + 100, 900)}`;

  return (
    <div className={`relative flex justify-between items-center p-4 rounded mx-5 transition-colors overflow-visible ${bgColorClass} ${hoverClass}`}>

      <div onClick={handleNoteClick} className="flex-1 cursor-pointer">
        <p className="text-lg font-medium break-words whitespace-normal">{title}</p>
      </div>

      {status === "deleted" && (
        <MdRestore
          onClick={!loading ? handleRestore : undefined}
          className={`text-green-600 hover:text-green-700 cursor-pointer text-xl ml-4 ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
          title="Restore Note"
        />
      )}

      {status === "archived" && (
        <MdUnarchive
          onClick={!loading ? handleUnarchive : undefined}
          className={`text-blue-600 hover:text-blue-700 cursor-pointer text-xl ml-4 ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
          title="Unarchive Note"
        />
      )}

      {status === "active" && (
        <MdArchive
          onClick={!loading ? handleArchive : undefined}
          className={`text-blue-600 hover:text-blue-700 cursor-pointer text-xl ml-4 ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
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
        className={`text-red-500 hover:text-red-600 cursor-pointer text-xl mx-2 ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
        title={status === "deleted" ? "Permanently Delete" : "Move to Bin"}
      />

      <BsThreeDotsVertical
        onClick={handleThreeDotMenu}
        className="h-5 w-5 cursor-pointer hover:text-gray-600 relative z-10"
      />

      {isOpen && (
        <div className="absolute right-4 top-12 bg-white border rounded shadow-md z-50 text-sm w-40">
          {status === "active" && (
            <>
              <div
                onClick={handleArchive}
                className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
              >
                Archive
              </div>
              <div
                onClick={() => {
                  setShowCategoryModal(true);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
              >
                Category
              </div>
              <div
                onClick={() => {
                  setShowColorModal(true);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
              >
                Color
              </div>
            </>
          )}

          {status === "archived" && (
            <div
              onClick={handleUnarchive}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Unarchive
            </div>
          )}

          {status === "deleted" && (
            <div
              onClick={handleRestore}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Restore
            </div>
          )}

          <div
            onClick={() => {
              if (status === "deleted") {
                setConfirmingDeleteId(id);
              } else {
                handleDelete();
              }
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
          >
            {status === "deleted" ? "Delete Permanently" : "Move to Bin"}
          </div>
        </div>
      )}

      {confirmingDeleteId === id && (
        <div className="absolute top-16 right-5 bg-white shadow-md border p-3 rounded z-50 w-64">
          <p className="text-sm text-gray-800 font-medium mb-2">
            Permanently delete this note?
            <div>Title: {title}</div>
          </p>
          <div className="flex justify-end gap-2">
            <div
              onClick={() => setConfirmingDeleteId(null)}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </div>
            <div
              onClick={handleDelete}
              className="text-sm px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded"
            >
              Delete
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <CategoryModal
          noteId={id}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {showColorModal && (
        <ColorModal
          noteId={id}
          onClose={() => setShowColorModal(false)}
          onClickClose={() => setShowColorModal(false)}
        />
      )}
    </div>
  );
};

export default NoteCard;
