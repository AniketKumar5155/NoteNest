import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FiEdit, FiTrash2, FiSettings, FiHelpCircle } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNotes } from "../context/NoteContext";
import { IoAddCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

const BurgerMenu = () => {
  const { createCategory, getAllActiveCategories, updateCatgory, categories } = useNotes();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);

  const handleMenu = () => setIsOpen((prev) => !prev);
  const handleCloseMenu = () => setIsOpen(false);

  const handleCreateCategory = async (name) => {
    if (!name.trim()) return toast.error("Category name is required");

    try {
      if (id) {
        await updateCatgory(id, name);
        toast.success("Category updated successfully");
      } else {
        await createCategory(name);
        toast.success("Category created successfully");
      }
      setName("");
      setIsEditing(false);
      setId(null);
      getAllActiveCategories()
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
    }
  };

  useEffect(() => {
    getAllActiveCategories();
  }, []);

  return (
    <>
      <HiOutlineMenu
        onClick={handleMenu}
        size={26}
        className="text-gray-700 cursor-pointer font-bold"
      />

      {isOpen && (
        <div className="fixed top-0 left-0 w-[90%] h-screen bg-white z-50 transition-all">
          <nav className="h-full bg-zinc-900 text-white flex flex-col gap-6 px-4 py-4 shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleMenu} className="text-3xl">
                <MdClose />
              </button>
            </div>

            <Link to="/" onClick={handleCloseMenu}>
              <div className="flex items-center gap-3 text-lg font-semibold border-b border-zinc-700 pb-2">
                <FiEdit />
                <span>Notes</span>
              </div>
            </Link>

            <div className="border-b border-zinc-700 pb-2">
              <div className="flex items-start gap-3 text-lg font-semibold mb-1">
                <BiCategory className="mt-1" />
                <div className="flex flex-col w-full gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Categories</h2>
                    <button
                      className="text-white hover:text-amber-400 transition-colors"
                      onClick={() => setIsEditing(true)}
                    >
                      <IoAddCircleOutline size={28} />
                    </button>
                  </div>

                  <div>
                    {isEditing ? (
                      <div className="flex justify-between items-center gap-4">
                        <input
                          type="text"
                          name="categoryName"
                          className="w-full h-8 px-2 rounded bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="Enter category"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleCreateCategory(name);
                          }}
                        />
                        <FaSave
                          size={24}
                          className="text-white hover:text-amber-400 cursor-pointer"
                          onClick={() => handleCreateCategory(name)}
                        />
                      </div>
                    ) : Array.isArray(categories) && categories.length > 0 ? (
                      <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/note/category/${encodeURIComponent(cat.name)}`}
                            onClick={handleCloseMenu}
                            className="bg-zinc-800 hover:bg-zinc-700 transition-colors text-white px-4 py-2 rounded shadow"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>

                    ) : (
                      <p className="text-sm text-gray-500">No categories found.</p>
                    )}

                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-zinc-700 pb-2 flex flex-col gap-3">
              <Link to="/archive" onClick={handleCloseMenu}>
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <BsArchive />
                  <span>Archive</span>
                </div>
              </Link>

              <Link to="/bin" onClick={handleCloseMenu}>
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <FiTrash2 className="text-xl" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-white">Bin</span>
                    <span className="text-sm font-normal text-gray-400">(deletes after 60 days)</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-lg font-semibold">
              <Link to="/settings" onClick={handleCloseMenu}>
                <div className="flex items-center gap-3">
                  <FiSettings />
                  <span>Settings</span>
                </div>
              </Link>

              <Link to="/help" onClick={handleCloseMenu}>
                <div className="flex items-center gap-3">
                  <FiHelpCircle />
                  <span>Help</span>
                </div>
              </Link>

              <Link to="/privacy-policy" onClick={handleCloseMenu}>
                <div className="flex items-center gap-3">
                  <HiOutlineShieldCheck />
                  <span>Privacy Policy</span>
                </div>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
