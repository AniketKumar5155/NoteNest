import Main from '../components/Main'
import ToolBar from '../components/ToolBar'

const ArchivePage = () => {
  return (
    <div className="flex flex-col h-screen">
        <ToolBar page={"ARCHIVE"} />
      <div className="flex-1 overflow-y-auto bg-[#ffefad]">
        <Main filter={"archived"} />
      </div>
    </div>
  )
}

export default ArchivePage
