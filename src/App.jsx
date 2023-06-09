import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Container/Share/Nav'
import HomeNav from './Container/Share/HomeNav'

function App() {

  return (
    // indian Africo-American ceremonial social classic dance fog-dance, break dance, Bangladeshi National Dance, hip hop dance, swing Dance
    <>
      <Nav></Nav>
      <div className="lg:flex">
        <HomeNav></HomeNav>
        <div >
          <Outlet ></Outlet>
        </div>
      </div>
    </>
  )
}

export default App
