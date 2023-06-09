/* */
import React from 'react';
import { FaHome, FaUserTie, FaBook } from "react-icons/fa";

const HomeNav = () => {
    return (
        <div className=" h-screen max-md:hidden max-sm:hidden bg-black fixed">
            <div className=''>
                <div className="dropdown dropdown-right dropdown-hover ">
                    <label tabIndex={0} className="">
                        <div className="">
                            <p className='p-2 border-2 w-20 rounded border-none bg-[#0a1724] hover:bg-[#5B95A0] text-white'><FaHome className='w-10 h-10 mx-auto'></FaHome></p>
                        </div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content shadow w-20  ">
                        <li className='py-2 border-2 w-20 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl '><a>Home</a></li>
                    </ul>
                </div>
            </div>
            <div className=''>
                <div className="dropdown dropdown-right dropdown-hover ">
                    <label tabIndex={0} className="">
                        <div className="">
                            <p className='p-2 border-2 w-20 rounded border-none bg-[#0A1724] hover:bg-[#5B95A0] text-white'><FaUserTie className='w-10 h-10 mx-auto'></FaUserTie></p>
                        </div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content shadow">
                    <li className='py-2 px-4 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl '><a>Instructor</a></li>
                    </ul>
                </div>
            </div>
            <div className=''>
                <div className="dropdown dropdown-right dropdown-hover ">
                    <label tabIndex={0} className="">
                        <div className="">
                            <p className='p-2 border-2 w-20 rounded border-none bg-[#0A1724] hover:bg-[#5B95A0] text-white'><FaBook className='w-10 h-10 mx-auto'></FaBook></p>
                        </div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content shadow ">
                        <li className='py-2 px-4 w-32 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl '><a>All Classes</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomeNav;