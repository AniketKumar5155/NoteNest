import Header from "../components/Header"
import ToolBar from "../components/ToolBar"
import Main from "../components/main"

const Homepage = () => {
  return (
    <>
    <div className="
    h-22">
      <ToolBar />
    </div>
      <div className="max-h-[calc(100vh-88px)] overflow-x-hidden overflow-y-auto relative">
        <Main />
      </div>
    </>
  )
}

export default Homepage
