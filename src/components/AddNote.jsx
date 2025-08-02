import { GoPlus } from "react-icons/go";

const AddNote = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-1 cursor-pointer hover:text-amber-600 transition duration-200 z-10"
      title="Add Note"
    >
      <GoPlus className="w-7 h-7" />
      <span className="hidden lg:inline font-medium text-sm ">New</span>
    </div>
  );
};

export default AddNote;
