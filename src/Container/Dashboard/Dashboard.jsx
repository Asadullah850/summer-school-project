import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaHome, FaHouseUser, FaUserEdit, FaUserTie } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import { GrUserManager } from "react-icons/gr";

const Dashboard = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [roll, setRoll] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/users/admin/${user?.email}`).then(res => {
            setRoll(res.data);
            // console.log(res.data);
        })
    }, [])

    const userStatus = roll.roll;


    // console.log(user);
    console.log(user);

    return (
        <div className=' bg-[#060b50] '>
            <ToastContainer></ToastContainer>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <div className='h-screen overflow-y-scroll lg:h-[calc(100vh-32px)] bg-white w-[98%] mx-auto mt-4 rounded-2xl '>
                        <Outlet ></Outlet>
                    </div>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>
                </div>

                <div className="drawer-side fixed h-auto lg:h-[calc(100vh-32px)] mt-8 ">
                    {
                        userStatus == 'admin' ?
                            <>
                                <div className="avatar">

                                <div className="avatar w-28 h-28 ">
                                        <div className=' text-8xl rounded-full bg-white'>
                                        {
                                            user ? <img className='p-1 rounded-full' src={user.photoURL} alt="" srcset="" />
                                            :
                                            <GrUserManager className='p-4'></GrUserManager>
                                        }
                                        
                                        </div>
                                    </div>
                                </div>
                                <p className=' text-xl text-white'>Admin</p>
                                <p className='px-2 text-xs text-white'>{roll.displayName}</p>
                            </>
                            : userStatus == 'Instructor' ?
                                <>
                                    <div className="avatar w-28 h-28 ">
                                        <div className=' text-8xl rounded-full bg-white'>
                                        {
                                            user ? <img className='p-1 rounded-full' src={user.photoURL} alt="" srcset="" />
                                            :
                                            <FaUserTie className=' mx-auto p-4'></FaUserTie>
                                        }
                                        
                                        </div>
                                    </div>
                                    <p className=' font-mono text-xl text-white'>Instructor</p>
                                    <p className='px-2 text-xs text-white'>{roll.displayName}</p>
                                </>
                                :
                                <>
                                <div className="avatar w-28 h-28 ">
                                        <div className=' text-8xl rounded-full bg-white'>
                                        {
                                            user ? <img className='p-1 rounded-full' src={user.photoURL} alt="" srcset="" />
                                            :
                                            <FaUserEdit className=' mx-auto p-4'></FaUserEdit>
                                        }
                                        
                                        </div>
                                    </div>
                                    <p className=' text-xl text-white'>Student</p>
                                    <p className='px-2 text-xs text-white'>Name: {roll.displayName}</p>
                                </>
                    }

                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu py-4 pl-4 pr-0 h-full bg-[#060b50]  text-base-content">
                        {/* Sidebar content here */}
                        {
                            userStatus == 'admin' ?
                                <>
                                    <NavLink to={'/dashboard/admin'}>
                                        <li className='p-2 border-2 border-white rounded bg-[#00054e] hover:bg-[#5B95A0] hover:text-black font-bold text-white text-sm'>Home</li>
                                    </NavLink>
                                    <NavLink to={'/dashboard/allUsers'}>
                                        <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-sm'>Manage Users</li>
                                    </NavLink>
                                    <NavLink to={'/dashboard/allClasses'}>
                                        <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-sm'>Manage Classes</li>
                                    </NavLink>

                                </>
                                : userStatus == 'Instructor' ?
                                    <>
                                        <NavLink to={'/dashboard/myclasses'}>
                                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>My Classes</li>
                                        </NavLink>
                                        <NavLink to={'/dashboard/classAdd'}>
                                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>Add Classes</li>
                                        </NavLink>
                                        <NavLink to={'/dashboard/feedbackPage'}>
                                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>Feedback</li>
                                        </NavLink>
                                    </>
                                    :
                                    <>
                                        <NavLink to={'/dashboard/studentClasses'}>
                                            <li className='p-2 border-2  border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black font-bold text-white text-xl'>My Class</li>
                                        </NavLink>
                                        <NavLink to={'/dashboard/enroll'}>
                                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>Enroll Class</li>
                                        </NavLink>
                                        <NavLink to={'/dashboard/payment'}>
                                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-sm'>Payment History</li>
                                        </NavLink>
                                    </>
                                   
                        }
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