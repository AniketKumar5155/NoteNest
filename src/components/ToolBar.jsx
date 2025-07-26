import { useEffect, useState, useRef } from "react";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSort } from "react-icons/md";
import Search from "./Search";
import { useNotes } from "../context/NoteContext";

const ToolBar = ({ page }) => {
  const sortRef = useRef(null);

  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "created_at");
  const [sortOrder, setSortOrder] = useState(() => localStorage.getItem("sortOrder") || "DESC");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { getFilteredSortedNotes } = useNotes();

  useEffect(() => {
    getFilteredSortedNotes({ sortBy, order: sortOrder });

    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(field);
      setSortOrder("DESC");
    }
  };

  const renderArrow = (field) => {
    if (sortBy !== field) return "";
    return sortOrder === "ASC" ? "↑" : "↓";
  };

  return (
    <>
      <div className="bg-amber-300 flex justify-between items-center p-3 shadow-md h-[64px]">
        <Search />

        <div className="flex items-center gap-4 pr-3 relative">
          <div ref={sortRef} className="relative">
            <MdOutlineSort
              size={26}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setIsSortOpen((prev) => !prev)}
            />

            {isSortOpen && (
              <div className="absolute top-9 right-0 bg-white shadow-lg border rounded-xl z-20 w-48 p-3 space-y-2">
                <h1 className="text-center text-gray-700 font-semibold border-b pb-2">
                  Sort by
                </h1>

                {["created_at", "updated_at", "title"].map((field) => (
                  <div
                    key={field}
                    className={`cursor-pointer px-2 py-1 rounded transition flex justify-between ${sortBy === field
                        ? "bg-amber-200 text-amber-800 font-semibold"
                        : "hover:bg-amber-100 hover:text-amber-600"
                      }`}
                    onClick={() => handleSort(field)}
                  >
                    <span className="capitalize">
                      {field
                        .replace(/_/g, " ")
                        .replace(/^([a-z])/, (match) => match.toUpperCase())}
                    </span>
                    <span className="font-bold ml-2">{renderArrow(field)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <CiFilter
            size={26}
            className="cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#ffefad]">
        <h1 className="font-bold text-[25px] underline">{page}</h1>
      </div>
    </>
  );
};

export default ToolBar;
