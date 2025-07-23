import { useState } from "react";
import { useNotes } from "../context/NoteContext";
import Filter from "./Filter";
import Sort from "./Sort";
import Search from "./Search";
import Dropdown from "./Dropdown";

const ToolBar = ({ page, category }) => {
  const [sort, setSort] = useState(null);
  const { getFilteredSortedNotes } = useNotes();

  const handleSortSelect = (newSort) => {
    setSort(newSort);
    getFilteredSortedNotes({
      sortBy: newSort?.field,
      order:
        newSort?.direction === "up"
          ? "ASC"
          : newSort?.direction === "down"
          ? "DESC"
          : undefined,
      category,
    });
  };

  // You can add a similar handler for filter if needed

  return (
    <>
      <div className="bg-amber-200 flex justify-between items-center p-2">
        <Search />

        <div className="flex gap-5 pr-3">
          {/* Sort Dropdown */}
          <Dropdown
            trigger={<Sort />}
            selectedSort={sort}
            onSelect={handleSortSelect}
            options={[
              { label: "Sort by", isLabel: true },
              { label: "Created At", value: "created_at" },
              { label: "Updated At", value: "updated_at" },
              { label: "Title", value: "title" },
              { label: "A-Z", value: "az" },
              { label: "Z-A", value: "za" },
            ]}
            enableFilterSort={true}
          />

          {/* Filter Dropdown */}
          <Dropdown
            trigger={<Filter />}
            options={[
              { label: "deleted", value: "deleted" },
              { label: "archived", value: "archived" },
              { label: "category", isLabel: true },
              { label: `${category}`, value: "category" },
            ]}
            enableFilterSort={true}
          />
        </div>
      </div>

      <div className="flex items-center justify-center bg-amber-100">
        <h1 className="font-bold text-[25px] underline">{page}</h1>
      </div>

    </>
  );
}

export default ToolBar;
