import { toast } from "react-toastify";
import { useNotes } from "../context/NoteContext";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const CategoryModal = ({ onClose, noteId }) => {
    const { categories, updateNote } = useNotes();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = async (category) => {
        setSelectedCategory(category);
        setIsOpen(false);

        if (!category) return;

        try {
            await updateNote(noteId, { category });
            onClose();
            toast.success("Category assigned successfully");
        } catch (error) {
            toast.error("Failed to assign category");
            console.error("Failed to assign category", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Select Category</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                        title="Close"
                    >
                        &times;
                    </button>
                </div>

                {Array.isArray(categories) && categories.length > 0 ? (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="w-full p-3 border border-gray-300 rounded-lg text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 flex justify-between items-center "
                        >
                            {selectedCategory || "-- Select a category --"}

                            <FaAngleDown
                                className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            />

                        </button>

                        {isOpen && (
                            <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-60 overflow-y-auto">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => handleSelect(cat.name)}
                                        className={`p-2 cursor-pointer hover:bg-amber-100 text-gray-800 ${selectedCategory === cat.name ? "bg-amber-50 font-semibold" : ""
                                            }`}
                                    >
                                        {cat.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        You can make categories from the menu on the homepage.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryModal;
