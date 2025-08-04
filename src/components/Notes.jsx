import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NoteEditorHeader from "../components/NoteEditorHeader";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from "react-toastify";
import useMediaQuery from "../hooks/useMediaQuery";
import { useNotes } from "../context/NoteContext";
import { MdRestore } from "react-icons/md";

const Notes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [noteStatus, setnoteStatus] = useState("active")

  const { createNote, updateNote, getNoteById, restoreDeletedNote } = useNotes();


  useEffect(() => {
    if (!id) {
      setTitle("");
      setContent("");
      return;
    }
    const fetchNote = async () => {
      try {
        const noteData = await getNoteById(id);
        setTitle(noteData.title);
        setContent(noteData.content);
        setnoteStatus(noteData.status || "active")
        console.log(noteStatus)
      } catch (error) {
        toast.error("Failed to fetch note");
      }
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    // if (noteStatus === "deleted"){
    //   toast.error("Notes can't be edited in bin")
    //   return;
    // }

    setLoading(true);
    try {
      if (id) {
        const noteData = await updateNote(id, { title, content });
        setTitle(noteData.title);
        setContent(noteData.content);
        toast.success("Note saved");
      } else {
        const newNote = await createNote({ title, content });
        if (isDesktop) {
          navigate(`/notes/${newNote.id}`);
        } else {
          navigate(`/note/${newNote.id}`);
        }
        toast.success("Note created");
      }
    } catch (error) {
      toast.error("Notes can't be edited in bin");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    try{
      await restoreDeletedNote(id)
      toast.success("Note restored successfully")
    }catch(error){
      console.log(error)
      toast.error("Failed to restore notes")
    }
  }



  return (
    <>
      <div className="h-screen flex flex-col">
        <NoteEditorHeader />

        <div className="flex items-center gap-2 bg-amber-100 h-10 p-2 flex-shrink-0">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full bg-amber-100 h-full focus:outline-none focus:ring-0 focus:border-none text-lg font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {noteStatus !== "deleted" ? (
            <>
              <button
                disabled={loading}
                onClick={() => toast.info("Undo functionality coming soon")}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-white text-sm font-medium transition-all duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
              >
                <RiArrowGoBackFill className="w-4 h-4" />
                Undo
              </button>

              <button
                onClick={async () => {
                  if (loading || !title.trim()) return;
                  await handleSave();
                }}
                disabled={loading || !title.trim()}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-white text-sm font-medium transition-all duration-200 ${loading || !title.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                <FaSave className="w-4 h-4" />
                {loading ? "Saving..." : "Save"}
              </button>
            </>) : <div>
            <button
              disabled={loading}
              onClick={()=>handleRestore()}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-white text-sm font-medium transition-all duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                }`}
            >
              <MdRestore className="w-4 h-4" />
              Restore
            </button>
          </div>}
        </div>

        <textarea
          name="content"
          placeholder="Content"
          className="block w-full h-full px-2 py-2 bg-amber-200 focus:outline-none focus:ring-0 focus:border-none resize-none leading-tight flex-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
};

export default Notes;
