import { Outlet } from "react-router-dom"
import Layout from "./Layout"

function App() {

  return (
    <>
    <Layout>
      {/* Your routes or main content */}
      <Outlet/>
    </Layout>
    </>
  )
}

export default App
