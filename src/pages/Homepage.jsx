import ToolBar from "../components/ToolBar";
import Main from "../components/Main";
import useMediaQuery from "../hooks/useMediaQuery";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="w-full lg:w-[30%] flex flex-col h-full">
          <Header />
          <div className="h-auto">
            <ToolBar />
          </div>
          <div className="flex-1 overflow-y-auto bg-[#ffefad]">
            <Main />
          </div>
        </div>

        {isDesktop && (
          <div className="w-full lg:w-[70%] h-full overflow-y-auto bg-amber-100 border-l border-amber-300">
            <Outlet />
          </div>
        )}

  
      </div>
    </>
  );
};

export default Homepage;
