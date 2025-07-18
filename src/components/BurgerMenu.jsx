import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { FiEdit, FiTrash2, FiSettings, FiHelpCircle } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => setIsOpen(prev => !prev);

  const handleCloseMenu = () => setIsOpen(false);

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

            <Link to={"/"} onClick={handleCloseMenu}>
              <div className="flex items-center gap-3 text-lg font-semibold border-b border-zinc-700 pb-2">
                <FiEdit />
                <span>Notes</span>
              </div>
            </Link>

            <div className="border-b border-zinc-700 pb-2">
              <div className="flex items-center gap-3 text-lg font-semibold mb-1">
                <BiCategory />
                <span>Categories</span>
              </div>
              <p className="text-sm text-gray-300 ml-1 italic">Categories are yet to be made</p>
            </div>

            <div className="border-b border-zinc-700 pb-2 flex flex-col gap-3">
              <Link to={"/archive"} onClick={handleCloseMenu}>
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <BsArchive />
                  <span>Archive</span>
                </div>
              </Link>

              <Link to={"/bin"} onClick={handleCloseMenu}>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="flex items-center gap-3 text-lg font-semibold mb-1">
                    <FiTrash2 className="text-xl" />
                    <span className="font-medium text-white">Bin</span>
                  </div>
                  <span>(deletes after 60 days)</span>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-lg font-semibold">
              <Link to={"/settings"} onClick={handleCloseMenu}>
                <div className="flex items-center gap-3">
                  <FiSettings />
                  <span>Settings</span>
                </div>
              </Link>

              <Link to={"/help"} onClick={handleCloseMenu}>
                <div className="flex items-center gap-3">
                  <FiHelpCircle />
                  <span>Help</span>
                </div>
              </Link>

              <Link to={"/privacy-policy"} onClick={handleCloseMenu}>
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
