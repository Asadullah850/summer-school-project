import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome,FaHouseUser, FaThLarge } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";

const Dashboard = () => {
    return (
        <div className=' bg-[#1824cc] '>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <div className='h-auto lg:h-[calc(100vh-32px)] bg-white w-[98%] mx-auto mt-4 rounded-2xl '>
                        <Outlet></Outlet>
                    </div>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>

                </div>
                <div className="drawer-side fixed h-auto lg:h-[calc(100vh-32px)] mt-8 ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu py-4 pl-4 pr-0 h-full bg-[#1824cc]  text-base-content">
                        {/* Sidebar content here */}
                        <Link to={'/dashboard/instructor'}>
                            <li className='p-2 border-2  border-white rounded  bg-[#0a1724] hover:bg-[#5B95A0] hover:text-black font-bold text-white'><a><FaHouseUser className='text-4xl'></FaHouseUser></a></li>
                        </Link>
                        <Link to={'/dashboard/classAdd'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#0a1724] hover:bg-[#5B95A0] hover:text-black text-white'><a><HiViewGridAdd className='text-4xl'></HiViewGridAdd></a></li>
                        </Link>
                        <Link to={'/dashboard/myclasses'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#0a1724] hover:bg-[#5B95A0] hover:text-black text-white'><a><FaThLarge className='text-4xl'></FaThLarge></a></li>
                        </Link>
                        {/* ************************************************************************ */}
                        <div className=" divider bg-slate-400 h-1"></div>
                        <Link to={'/'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#0a1724] hover:bg-[#5B95A0] hover:text-black text-white'><a><FaHome className='text-4xl'></FaHome></a></li>
                        </Link>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;