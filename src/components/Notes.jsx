import NoteEditorHeader from "./NoteEditorHeader"
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { createNoteService, getNoteByIdService, updateNoteService } from "../service/noteService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
// 44px
const Notes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const getNoteById = async () => {
    try {
      const noteData = await getNoteByIdService(id);
      setTitle(noteData.title);
      setContent(noteData.content);
    } catch (error) {
      toast.error("Ek note nahi fetch ho paa raha hain")
    }
  }
  useEffect(() => {
    if (id) {
      getNoteById();
    }
  }, [])

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
      }
      else {
        const newNote = await createNoteService({ title, content });
        const newId = newNote.id;
        navigate(`/note/${newId}`)
        toast.success('Note Created')
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
    {/* Header stays fixed */}
    <div className="flex-shrink-0">
      <NoteEditorHeader />
      <div className="flex items-center gap-2 bg-amber-100 h-8 p-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full bg-amber-100 h-full focus:outline-none focus:ring-0 focus:border-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          <RiArrowGoBackFill className="text-yellow-500 h-6 w-6" />
          <FaSave
            className={`h-6 w-6 cursor-pointer 
              ${title.trim() ? "text-green-500" : "text-gray-400"} 
              ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            onClick={async () => {
              if (loading || !title.trim()) return;
              setLoading(true);
              await handleSave();
              setLoading(false);
            }}
          />
        </div>
      </div>
    </div>
<div className="flex-1 overflow-y-auto min-h-0">
  <textarea
    name="content"
    placeholder="Content"
    className="block w-full h-full px-2 bg-amber-200 focus:outline-none focus:ring-0 focus:border-none resize-none leading-tight"
    value={content}
    onChange={(e) => setContent(e.target.value)}
  ></textarea>
</div>

  </div>
);

}

export default Notes
