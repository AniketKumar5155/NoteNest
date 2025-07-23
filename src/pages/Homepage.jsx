import Header from "../components/Header";
import ToolBar from "../components/ToolBar";
import Main from "../components/Main";

const Homepage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-22">
        <ToolBar />
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24">
        <Main />
      </div>
    </div>

  );
};

export default Homepage;
