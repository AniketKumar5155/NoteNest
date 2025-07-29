import Main from "../components/Main";
import ToolBar from "../components/ToolBar";

const Bin = () => {
  return (
    <div className="flex flex-col h-screen">
        <ToolBar page="BIN" />
      <div className="flex-1 overflow-y-auto bg-[#ffefad]">
        <Main filter="deleted" />
      </div>
    </div>
  );
};

export default Bin;
