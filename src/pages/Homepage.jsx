import Header from "../components/Header";
import ToolBar from "../components/ToolBar";
import Main from "../components/Main";

const Homepage = () => {
  return (
    <div className="flex flex-col h-screen">
        <ToolBar />
      <div className="flex-1 overflow-y-auto bg-[#ffefad]">
        <Main />
      </div>
    </div>
  );
};


export default Homepage;
