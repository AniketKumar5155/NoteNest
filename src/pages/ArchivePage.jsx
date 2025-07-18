import React from 'react'
import Main from '../components/main'
import ToolBar from '../components/ToolBar'

const ArchivePage = () => {
  return (
    <div>
      <ToolBar page={"ARCHIVE"}/>
      <Main filter="archived"/>
    </div>
  )
}

export default ArchivePage
