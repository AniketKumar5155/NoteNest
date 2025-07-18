import Filter from "./Filter"
import Sort from "./Sort"
import Search from "./Search"

const ToolBar = ({page}) => {
  return (
    <>
      <div className="bg-amber-200 flex justify-between items-center p-2">
        <Search/>
        <div className="flex gap-5 pr-3">
        <Sort/>        
        <Filter/>
        </div>
      </div>
      <div className='flex items-center justify-center bg-amber-100'>
       <h1 className='font-bold text-[25px] underline'>{page}</h1>
        </div>
    </>
  )
}

export default ToolBar
