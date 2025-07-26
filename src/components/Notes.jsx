import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";

import NoteEditorHeader from "./NoteEditorHeader";
import { useNotes } from "../context/NoteContext";

const Notes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    createNote,
    updateNote,
    getNoteById,
  } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await getNoteById(id);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        }
      } catch (err) {
        toast.error("Failed to fetch note");
      }
    };

    if (id) fetchNote();
  }, [id, getNoteById]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await updateNote(id, { title, content });
        toast.success("Note updated");
      } else {
        const newNote = await createNote({ title, content });
        if (newNote?.id) {
          navigate(`/note/${newNote.id}`);
          toast.success("Note created");
        }
      }
    } catch (err) {
      toast.error("Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NoteEditorHeader />
      <div className="flex items-center gap-2 bg-amber-100 h-7 p-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full wrap bg-amber-100 h-7 focus:outline-none focus:ring-0 focus:border-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-2">
          <div>
            <RiArrowGoBackFill className="text-yellow-500 h-7 w-7" />
          </div>
          <FaSave
            className={`h-7 w-7 cursor-pointer 
              ${title.trim() ? "text-green-500" : "text-gray-400"} 
              ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            onClick={handleSave}
          />
        </div>
      </div>
      <hr />
      <textarea
        name="content"
        placeholder="Content"
        className="w-full h-[84vh] px-2 pt-1 bg-amber-200 focus:outline-none min-h-screen focus:ring-0 focus:border-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default Notes;
