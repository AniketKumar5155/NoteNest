import { IoMdArrowRoundBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNotes } from "../context/NoteContext";
import { useParams } from "react-router-dom";

const NoteEditorHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef(null);

    const { archiveNote, getNoteById } = useNotes();

    const handleThreeDotMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { id } = useParams();

    const handleArchive = async () => {
        try {
            setLoading(true);
            const note = await getNoteById(id);
            if (!note) {
            toast.error("Note not found. Please check the note and try again.");
                return;
            }

            if (note.is_archived) {
                toast.info("Note is already archived");
                return;
            }
            await archiveNote(id);
            toast.success("Note has been archived successfully.");
        } catch (error) {
            // Optionally log to a monitoring service if needed
            toast.error("Unable to archive note. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="relative flex justify-between px-2 py-1.5 bg-amber-300 items-center h-[44px]">
            <Link to="/">
                <IoMdArrowRoundBack className="h-5 w-5" />
            </Link>

            <div className="font-bold text-2xl">
                NoteNest
            </div>

            <div className="relative" ref={menuRef}>
                <BsThreeDotsVertical
                    onClick={handleThreeDotMenu}
                    className="h-5 w-5 cursor-pointer"
                />

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
                        <div className="absolute -top-2 right-4">
                            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-white"></div>
                        </div>

                        <div className="py-2">
                            <div onClick={handleArchive} className="block px-4 py-2 hover:bg-gray-100">Archive</div>
                            <div className="block px-4 py-2 hover:bg-gray-100">Bin</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteEditorHeader;
