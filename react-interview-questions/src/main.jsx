import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import QuesOne from './questions/question-1-cinema-seat-booking/QuesOne.jsx'
import QuesTwo from './questions/question-2-file-explorer/QuesTwo.jsx'
import QuesThree from './questions/question-3-pagination/QuesThree.jsx'
import QuesFour from './questions/question-4-memory-game/QuesFour.jsx'
import QuestionFive from './questions/question-5-progress-bar/QuestionFive.jsx'
import QuesSix from './questions/question-6-grid-lights/QuesSix.jsx'
import QuesSeven from './questions/question-7-tic-tac-toe/QuesSeven.jsx'


const router = createBrowserRouter([
  {
    path: '/',                // Root path
    element: <App />,         // Parent element (App is the layout or container)
    children: [               // Nested routes under App
      {
        path: 'cinema-seat-booking', // URL becomes "/question-one"
        element: <QuesOne />, // Component to render
      },
      {
        path: 'file-explorer', // URL becomes "/question-one"
        element: <QuesTwo />, // Component to render
      },
      {
        path: 'pagination', // URL becomes "/question-one"
        element: <QuesThree />, // Component to render
      },
      {
        path: 'memory-game', // URL becomes "/question-one"
        element: <QuesFour />, // Component to render
      },
      {
        path: 'progress-bar', // URL becomes "/question-one"
        element: <QuestionFive />, // Component to render
      },
      {
        path: 'grid-lights', // URL becomes "/question-one"
        element: <QuesSix />, // Component to render
      },
      {
        path: 'tic-tac-toe', // URL becomes "/question-one"
        element: <QuesSeven />, // Component to render
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
