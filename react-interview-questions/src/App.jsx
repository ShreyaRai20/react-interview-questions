import QuesFour from "./questions/question-4-memory-game/QuesFour"
import QuesOne from "./questions/question-1-cinema-seat-booking/QuesOne"
import QuesThree from "./questions/question-3-pagination/QuesThree"
import QuesTwo from "./questions/question-2-file-explorer/QuesTwo"
import QuestionFive from "./questions/question-5-progress-bar/QuestionFive"
import QuesSix from "./questions/question-6-grid-lights/QuesSix"
import QuesSeven from "./questions/question-7-tic-tac-toe/QuesSeven"
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar"

import { Outlet } from 'react-router-dom'


function App() {


  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className=" h-screen col-10 overflow-auto bg-amber-50">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
