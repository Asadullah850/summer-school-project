import React, { useState } from 'react';
import { HiSun, HiMoon } from "react-icons/hi";

const Home = () => {
    const [light, setLight] = useState(true)
    const handelTheme = (light) => {
        setLight(light)
        console.log(light);
    }

    return (
        <div className="">
            <button className=' absolute top-2 rounded-full  p-1 text-white left-28 ' onClick={() => handelTheme(!light)} >
                {
                    light ? <HiMoon className='text-4xl '></HiMoon> : <HiSun className='text-4xl '></HiSun>
                }
            </button>
            <div className={light ? `lg:ml-20 md:mx-0 mx-0` : `lg:ml-20 md:mx-0 mx-0 bg-blue-950 text-white`}>
                home
            </div>
        </div>
    );
};

export default Home;