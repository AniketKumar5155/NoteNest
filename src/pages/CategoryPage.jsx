import { useParams } from "react-router-dom";
import ToolBar from "../components/ToolBar";
import Main from "../components/Main";
import Header from "../components/Header";

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen">
        <ToolBar page={categoryName} />
        <div className="flex-1 overflow-y-auto bg-[#ffefad]">
          <Main 
            sortBy="created_at"
            sortOrder="desc"
            categoryName={categoryName}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
