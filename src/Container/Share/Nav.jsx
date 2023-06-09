import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Nav = () => {
   
    return (
        <div className="navbar bg-[#0A1724] text-white">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className=" flex px-1">
                        <Link to='/'>
                        <li className='bg-[#A82321] mx-1 lg:hidden md:hidden rounded-md px-4 py-2 hover:bg-[#a5100e]'>Home</li>
                        </Link>
                        <Link to='/dashboard'>
                        <li className='bg-[#A82321] mx-1 lg:hidden md:hidden rounded-md px-4 py-2 hover:bg-[#a5100e]'>Instructor</li>
                        </Link>
                        <Link to='/dashboard'>
                        <li className='bg-[#A82321] mx-1 lg:hidden md:hidden rounded-md px-4 py-2 hover:bg-[#a5100e]'>All Class</li>
                        </Link>
                        <Link to='/dashboard'>
                        <li className='bg-[#A82321] mx-1 rounded-md px-4 py-2 hover:bg-[#a5100e]'>Dashboard</li>
                        </Link>
                        <li className='bg-[#A82321] mx-1 rounded-md px-4 py-2 hover:bg-[#a5100e]'><a>Login</a></li>
                        <li className='bg-[#A82321] mx-1 rounded-md px-4 py-2 hover:bg-[#a5100e]'><a>Register</a></li>
                    </ul>

                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className=" text-center rounded-full">
                            <FaUserCircle className='text-4xl '></FaUserCircle>
                        </div>
                    </label>
                    
                    <ul tabIndex={0} className="menu menu-sm hover:text-black hover:font-bold dropdown-content mt-2 p-2 shadow rounded-box w-32">
                        <li>
                            <a className="justify-between bg-[#A82321] m-1 rounded-md">
                                Profile
                                <span className=" badge">New</span>
                            </a>
                        </li>
                        <li className='bg-[#A82321] m-1 rounded-md hover:bg-white'><a>Settings</a></li>
                        <li className='bg-[#A82321] m-1 rounded-md hover:bg-white'><a>Logout</a></li>
                    </ul>
                </div>

            </div>
    );
};

export default Nav;