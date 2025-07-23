import { useEffect, useRef, useState } from "react";

const Dropdown = ({ trigger, options = [], selectedSort, onSelect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (value) => {
    let newDirection = "up";

    if (selectedSort?.field === value) {
      if (selectedSort.direction === "up") newDirection = "down";
      else if (selectedSort.direction === "down") newDirection = null;
    }

    const newSort = newDirection ? { field: value, direction: newDirection } : null;
    onSelect?.(newSort);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-200"
        >
          {/* Triangle pointer */}
          <div className="absolute -top-2 right-5">
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-white" />
          </div>

          <div className="py-2">
            {options.map((option, index) =>
              option.isLabel ? (
                <div
                  key={`label-${index}`}
                  className="px-4 py-2 bg-gray-100 text-gray-500 text-[11px] uppercase font-semibold tracking-wider border-t border-gray-300"
                >
                  {option.label}
                </div>
              ) : (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
                >
                  <span className="flex items-center gap-2">
                    {/* Tick only if selected */}
                    {selectedSort?.field === option.value && (
                      <span className="text-green-500">✔</span>
                    )}
                    <span>{option.label}</span>
                    {option.optional && (
                      <span className="ml-1 text-xs text-gray-400 italic">(optional)</span>
                    )}
                  </span>

                  {/* Arrow for direction */}
                  {selectedSort?.field === option.value && selectedSort.direction && (
                    <span className="text-sm text-gray-600">
                      {selectedSort.direction === "up"
                        ? "↑"
                        : selectedSort.direction === "down"
                        ? "↓"
                        : ""}
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
