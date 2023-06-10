import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaHouseUser, FaThLarge } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Dashboard = () => {

    const instractor = useState(true)
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/classData`)
            .then(data => {
                setClasses(data.data);
                console.log(data.data);
            })
    }, [])
    return (
        <div className=' bg-[#060b50] '>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <div className='h-auto lg:h-[calc(100vh-32px)] bg-white w-[98%] mx-auto mt-4 rounded-2xl '>
                        <Outlet user={instractor}></Outlet>
                    </div>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>
                </div>
                
                <div className="drawer-side fixed h-auto lg:h-[calc(100vh-32px)] mt-8 ">
                {
                    instractor ? 
                        <>
                            <div className="avatar">
                                <div className=' text-9xl rounded-full bg-white'>
                                    <FaHouseUser className='p-4'></FaHouseUser>
                                </div>
                            </div>
                            <p  className=' text-xl text-white'>instractor</p>
                            <p  className=' text-xl text-white'>email</p>
                        </>
                        :
                        <>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    admin
                                </div>
                            </div>
                        </>
                }

                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu py-4 pl-4 pr-0 h-full bg-[#060b50]  text-base-content">
                        {/* Sidebar content here */}
                        <NavLink to={'/dashboard/instructor'}>
                            <li className='p-2 border-2  border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black font-bold text-white text-xl'>Home</li>
                        </NavLink>
                        <NavLink to={'/dashboard/classAdd'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>Add Classes</li>
                        </NavLink>
                        <NavLink to={'/dashboard/myclasses'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>My Classes</li>
                        </NavLink>
                        {/* ************************************************************************ */}
                        <div className=" divider bg-slate-400 h-1"></div>
                        <NavLink to={'/'}>
                            <li className='p-2 w-full  font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white'><a><FaHome className='text-4xl mx-5'></FaHome></a></li>
                        </NavLink>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;