import Main from "../components/Main"
import ToolBar from "../components/ToolBar"


const Bin = () => {
  return (
    <div>
      <ToolBar page={"BIN"}/>
      <Main filter="deleted"/>
    </div>
  )
}

export default Bin 

