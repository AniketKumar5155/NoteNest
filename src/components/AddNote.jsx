import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const AddNote = ({ categoryName, onClick }) => {
  return (
    <Link to={`/note/${categoryName ? `category?category=${categoryName}` : ""}`}>
      <IoAddCircleSharp
        onClick={onClick}
        className="fixed bottom-5 right-5 text-amber-500 hover:text-amber-600 w-16 h-16 cursor-pointer transition-colors"
        title="Add Note"
      />
    </Link>
  );
};

export default AddNote;
