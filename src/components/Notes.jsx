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
    try{
      const noteData = await getNoteByIdService(id);
      setTitle(noteData.title);
      setContent(noteData.content);
    } catch(error){
      toast.error("Ek note nahi fetch ho paa raha hain")
    }
  }
  useEffect(()=>{
    if (id){
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
      if (id){
        const noteData = await updateNoteService(id,  { title, content });
        setTitle(noteData.title);
        setContent(noteData.content);
        toast.success("Note saved");
      }
      else {
        const newNote = await createNoteService({ title, content });
        const newId = newNote.id;
        navigate(`/note/${newId}`)
        toast.success('HELLO FRIENDS CHAI PILO')
      }
    } catch (error) {
      console.error("Error saving or fetching note:", error);
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }


  };


  return (
    <>
      <div>
        <NoteEditorHeader />
        <div className="flex items-center gap-2 bg-amber-100 h-7 p-2">
          <input type="text" name="title" placeholder="Title" className="w-full wrap bg-amber-100 h-7 focus:outline-none focus:ring-0 focus:border-none " value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex gap-2">
            <div><RiArrowGoBackFill className="text-yellow-500 h-7 w-7" /></div>
            <div> <FaSave className={`h-7 w-7 cursor-pointer ${ title.trim() ? "text-green-500" : "text-gray-400" }`} onClick={ handleSave } disabled={ !title.trim() || loading } /> </div>
          </div>
        </div>
        <hr />
        <textarea name="content" placeholder="Content" className="w-full h-[84vh] px-2 pt-1 bg-amber-200 focus:outline-none focus:ring-0 focus:border-none" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
      </div>
    </>
  )
}

export default Notes
