import NoteEditorHeader from "./NoteEditorHeader";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  createNoteService,
  getNoteByIdService,
  updateNoteService,
} from "../service/noteService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const getNoteById = async () => {
    try {
      const noteData = await getNoteByIdService(id);
      setTitle(noteData.title);
      setContent(noteData.content);
    } catch (error) {
      toast.error("Ek note nahi fetch ho paa raha hain");
    }
  };

  useEffect(() => {
    if (id) {
      getNoteById();
    }
  }, []);
const handleSave = async () => {
  if (!title.trim()) {
    toast.error("Title is required");
    return;
  }

  setLoading(true);
  try {
    if (id) {
      const noteData = await updateNoteService(id, { title, content });
      setTitle(noteData.title);
      setContent(noteData.content);
      toast.success("Note saved");
    } else {

      const newNote = await createNoteService({title, content,});
      const newId = newNote.id;
      navigate(`/note/${newId}`);
      toast.success("Note Created");
    }
  } catch (error) {
    console.error("Error saving or fetching note:", error); 
    toast.error("Failed to save");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen flex flex-col">
      <div className="flex-shrink-0">
        <NoteEditorHeader />
        <div className="flex items-center gap-2 bg-amber-100 h-10 p-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full bg-amber-100 h-full focus:outline-none focus:ring-0 focus:border-none text-lg font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            disabled={loading}
            onClick={() => toast.info("Undo functionality coming soon")}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-md text-white 
              text-sm font-medium transition-all duration-200
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}
            `}
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
            className={`
              flex items-center gap-1 px-3 py-2 rounded-md text-white 
              text-sm font-medium transition-all duration-200
              ${loading || !title.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"}
            `}
          >
            <FaSave className="w-4 h-4" />
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <textarea
          name="content"
          placeholder="Content"
          className="block w-full h-full px-2 py-2 bg-amber-200 focus:outline-none focus:ring-0 focus:border-none resize-none leading-tight"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Notes;
