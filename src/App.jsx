import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Container/Share/Nav'
import HomeNav from './Container/Share/HomeNav'
import { ToastContainer } from 'react-toastify'
import { HiSun, HiMoon } from "react-icons/hi";
import { useState } from 'react'


function App() {

  const [light, setLight] = useState(true)
  const handelTheme = (light) => {
    setLight(light)
    console.log(light);
  }


  return (
    // indian classic Africo-American ceremonial social classic dance fog-dance, break dance, Bangladeshi National Dance, hip hop dance, swing Dance
    <div className='w-full'>
      <button className=' absolute top-2 rounded-full  p-1 text-white left-28 ' onClick={() => handelTheme(!light)} >
        {
          light ? <HiMoon className='text-4xl '></HiMoon> : <HiSun className='text-4xl '></HiSun>
        }
      </button>
      <ToastContainer />
      <Nav></Nav>
      <Outlet></Outlet>
    </div>
  )
}

export default App
