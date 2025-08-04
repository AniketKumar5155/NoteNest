import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useNotes } from "../context/NoteContext";

const ColorModal = ({ onClickClose, noteId }) => {
    const BASE_COLORS = [
        "red", "orange", "amber", "yellow", "green",
        "blue", "indigo", "purple", "pink", "brown",
        "gray", "black", "cyan", "lime", "teal",
    ];

    const SHADES = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];


    const { notes, updateNoteColorAndShade } = useNotes();
    const note = notes.find((n) => n.id === noteId);
    const [selectedColor, setSelectedColor] = useState(note?.color || "");
    const [showShadeOptions, setShowShadeOptions] = useState(false);
    const [selectedShade, setSelectedShade] = useState(note?.shade || "");

    const handleShadeToggle = () => setShowShadeOptions(prev => !prev);

    const handleColorSelect = (color) => {
        if (!color) return;

        setSelectedColor(color);
        setShowShadeOptions(true);
    };

    const handleshadeSelect = async (shade) => {
        if (!shade) return;
        setSelectedShade(shade);
    };

    const applyColor = async () => {
        try {
            await updateNoteColorAndShade(noteId, { color: selectedColor, shade: selectedShade })
            // toast.success("Note color applied successfully")
        } catch (error) {
            toast.error("Failed to apply Note color")
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[320px] max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Choose Color</h2>
                    <IoMdClose size={25} className="cursor-pointer" onClick={onClickClose} />
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4">
                    {BASE_COLORS.map((color) => (
                        <div
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-black border-4" : "border-gray-300"
                                } bg-${color}-500`}
                            title={color}
                        />
                    ))}
                </div>

                <div
                    onClick={handleShadeToggle}
                    className="text-center text-sm cursor-pointer text-blue-600 underline mb-2"
                >
                    {selectedShade ? `Selected Shade: ${selectedShade}` : "Choose a shade"}
                </div>

                {showShadeOptions && (
                    <div className="flex flex-wrap gap-2 justify-center">
                        {SHADES.map((shade) => (
                            <div
                                key={shade}
                                onClick={() => handleshadeSelect(shade)}
                                className={`px-2 py-1 text-sm rounded cursor-pointer border ${selectedShade === shade
                                    ? "bg-blue-100 border-blue-500"
                                    : "bg-gray-100"
                                    }`}
                            >
                                {shade}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4 text-center text-sm text-gray-600 flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-full border bg-${selectedColor}-${selectedShade}`}
                    ></div>
                    <div>
                        Selected: <b>{selectedColor}</b>-<b>{selectedShade}</b>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={applyColor}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
                    >
                        Done
                    </button>
                </div>


            </div>
        </div>
    );
};

export default ColorModal;
