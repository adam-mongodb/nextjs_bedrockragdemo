'use client'
import ChatbotBox from "./components/ChatbotBox"
import FilleUpload from "./components/FilleUpload"
import StartIngestionJob from "./components/StartIngestionJob"
import FileList from "./components/FileList"
import { useState } from "react"

const HomePage = () => {

  const [refresh, setRefresh] = useState(false);

  const refreshList = async () => {
    setRefresh(!refresh);
  }

  return (
    <>
      <h2 className="logo">PDF Search - Chatbot</h2>
      <div className="switch-card">
        <ChatbotBox />
        <div className='file-card'>
          <div className="card">
            <FilleUpload/> 
          </div>
          <div className="card">
            <button onClick={refreshList}>Refresh</button>
            <h3>Bucket List:</h3>
            <FileList refresh={refresh}/>
          </div>
        </div>
        <div className='ingestion-card'>
          <div className="card">
            <StartIngestionJob />
          </div>
        </div> 
      </div>
    </>
  )
}

export default HomePage