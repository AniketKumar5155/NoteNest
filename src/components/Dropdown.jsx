import { useEffect, useRef, useState } from "react";

const Dropdown = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setOpen(!open);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50"
        >

          <div className="absolute -top-2 right-4">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white"></div>
          </div>

          <div className="py-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
