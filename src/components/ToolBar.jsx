import { CiFilter } from "react-icons/ci";
import { MdOutlineSort } from "react-icons/md";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import Search from "./Search";
import { useState, useEffect } from "react";
import { useNotes } from "../context/NoteContext";

const ToolBar = ({ page }) => {
  const { getFilteredSortedNotes } = useNotes();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [sortState, setSortState] = useState({
    created_at: null,
    updated_at: null,
    title: null,
  });

  const dropdownOptionsCss =
    "cursor-pointer px-2 py-1 rounded hover:bg-amber-100 hover:text-amber-600 transition";

  useEffect(() => {
    const savedSortBy = localStorage.getItem("sortBy");
    const savedSortOrder = localStorage.getItem("sortOrder");

    if (savedSortBy && savedSortOrder) {
      setSortBy(savedSortBy);
      setSortOrder(savedSortOrder);

      setSortState((prev) => ({
        ...prev,
        [savedSortBy]:
          savedSortOrder === "DESC" ? (
            <FaArrowDownLong className="text-amber-600" />
          ) : (
            <FaArrowUpLong className="text-amber-600" />
          ),
      }));

      getFilteredSortedNotes({
        sortBy: savedSortBy,
        order: savedSortOrder,
      });
    } else {
      getFilteredSortedNotes({
        sortBy: "created_at",
        order: "DESC",
      });

      localStorage.setItem("sortBy", "created_at");
      localStorage.setItem("sortOrder", "DESC");

      setSortBy("created_at");
      setSortOrder("DESC");
      setSortState((prev) => ({
        ...prev,
        created_at: <FaArrowDownLong className="text-amber-600" />,
      }));
    }
  }, []);

  const handleSort = (field) => {
    const direction = sortState[field];
    let newDirection = null;
    let newOrder = null;

    if (direction === null) {
      newDirection = <FaArrowDownLong className="text-amber-600" />;
      newOrder = "DESC";
    } else if (direction?.type === FaArrowDownLong) {
      newDirection = <FaArrowUpLong className="text-amber-600" />;
      newOrder = "ASC";
    } else {
      newDirection = null;
      newOrder = null;
    }

    setSortBy(newOrder ? field : null);
    setSortOrder(newOrder);

    setSortState({
      created_at: null,
      updated_at: null,
      title: null,
      [field]: newDirection,
    });

    if (newOrder) {
      localStorage.setItem("sortBy", field);
      localStorage.setItem("sortOrder", newOrder);
      getFilteredSortedNotes({ sortBy: field, order: newOrder });
    } else {
      localStorage.removeItem("sortBy");
      localStorage.removeItem("sortOrder");
      getFilteredSortedNotes({});
    }
  };

  return (
    <>
      <div className="bg-amber-300 flex justify-between items-center p-3 shadow-md h-[64px] ">
        <Search />
        <div className="flex items-center gap-4 pr-3 relative">
          {/* Sort Icon and Dropdown */}
          <div className="relative">
            <MdOutlineSort
              size={26}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => {
                setIsSortOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
            />
            {isSortOpen && (
              <div className="absolute top-9 right-0 bg-white shadow-lg border rounded-xl z-20 w-48 p-3 space-y-2">
                <h1 className="text-center text-gray-700 font-semibold border-b pb-2">
                  Sort by
                </h1>
                <div
                  className={`${dropdownOptionsCss} flex items-center gap-2`}
                  onClick={() => handleSort("created_at")}
                >
                  Created at {sortState["created_at"]}
                </div>
                <div
                  className={`${dropdownOptionsCss} flex items-center gap-2`}
                  onClick={() => handleSort("updated_at")}
                >
                  Updated at {sortState["updated_at"]}
                </div>
                <div
                  className={`${dropdownOptionsCss} flex items-center gap-2`}
                  onClick={() => handleSort("title")}
                >
                  Title {sortState["title"]}
                </div>
              </div>
            )}
          </div>

          {/* Filter Icon and Dropdown */}
          <div className="relative">
            <CiFilter
              size={26}
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => {
                setIsFilterOpen((prev) => !prev);
                setIsSortOpen(false);
              }}
            />
            {isFilterOpen && (
              <div className="absolute top-9 right-0 bg-white shadow-lg border rounded-xl z-20 w-48 p-3 space-y-2">
                <h1 className="text-center text-gray-700 font-semibold border-b pb-2">
                  Filter by
                </h1>

                <label className="text-gray-500 text-sm font-medium pl-1">
                  Status
                </label>
                <div className={`${dropdownOptionsCss}`}>Deleted</div>
                <div className={`${dropdownOptionsCss}`}>Archived</div>

                <label className="text-gray-500 text-sm font-medium pl-1 pt-1">
                  Category
                </label>
                <div className={`${dropdownOptionsCss}`}>Work</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#ffefad]">
        <h1 className="font-bold text-[25px] underline">{page}</h1>
      </div>
    </>
  );
};

export default ToolBar;
