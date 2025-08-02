import ToolBar from "../components/ToolBar";
import Main from "../components/Main";
import Notes from "../components/Notes";
import useMediaQuery from "../hooks/useMediaQuery";
import Header from "../components/Header";
import { Outlet, useParams } from "react-router-dom";

const CategoryPage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { categoryName } = useParams();

  return (
    <>
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="w-full lg:w-[30%] flex flex-col h-full">
          <Header />
          <div className="h-auto lg:h-[30%]">
            <ToolBar page={categoryName} />
          </div>
          <div className="flex-1 min-h-screen bg-[#ffefad] overflow-y-auto">
            <Main
              sortBy="created_at"
              sortOrder="desc"
              categoryName={categoryName}
            />
          </div>
        </div>

        {isDesktop && (
          <div className="w-full lg:w-[70%] h-full overflow-y-auto">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;