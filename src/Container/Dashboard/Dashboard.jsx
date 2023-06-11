import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaHome, FaHouseUser, FaThLarge, FaUserTie } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const { user,  loading} = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [roll, setRoll] = useState([]);
    const instractor = useState(true)
    
    useEffect(() => {
        
        axiosSecure.get(`/users/admin/${user?.email}`).then(res => {
            setRoll(res.data);
            console.log(res.data);
        })
    }, [])
    if (loading) {
        return <p>loading................</p>
    }
    const userStatus = roll.roll;
    // console.log(userStatus);
    // console.log(isAdmin);

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
                    userStatus == 'admin' ? 
                        <>
                            <div className="avatar">
                                <div className=' text-9xl rounded-full bg-white'>
                                    <FaUserTie className='p-4'></FaUserTie>
                                </div>
                            </div>
                            <p  className=' text-xl text-white'>Admin</p>
                            <p  className='px-2 text-xs text-white'>{user.email}</p>
                        </>
                        :  userStatus == 'Instructor' ?
                        <>
                            <div className="avatar">
                                <div className=' text-9xl rounded-full bg-white'>
                                    <FaUserTie className='p-4'></FaUserTie>
                                </div>
                            </div>
                            <p  className=' text-xl text-white'>Instructor</p>
                            <p  className='px-2 text-xs text-white'>{user.email}</p>
                        </> 
                        : 
                         <>
                         <div className="avatar">
                             <div className=' text-9xl rounded-full bg-white'>
                                 <FaThLarge className='p-4'></FaThLarge>
                             </div>
                         </div>
                         <p  className=' text-xl text-white'>Student</p>
                         <p  className='px-2 text-xs text-white'>{user.email}</p>
                     </> 
                }

                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu py-4 pl-4 pr-0 h-full bg-[#060b50]  text-base-content">
                        {/* Sidebar content here */}
                        {
                            userStatus == 'admin' ?
                            <>
                            <NavLink to={'/dashboard/admin'}>
                            <li className='p-2 border-2  border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black font-bold text-white text-xl'>Home</li>
                        </NavLink>
                        <NavLink to={'/dashboard/allUsers'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>All Users</li>
                        </NavLink>
                        <NavLink to={'/dashboard/allClasses'}>
                            <li className='p-2 font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white text-xl'>All Classes</li>
                        </NavLink>
                        {/* ************************************************************************ */}
                        <div className=" divider bg-slate-400 h-1"></div>
                        <NavLink to={'/'}>
                            <li className='p-2 w-full  font-bold border-2 my-1 border-white rounded  bg-[#00054e] hover:bg-[#5B95A0] hover:text-black text-white'><a><FaHome className='text-4xl mx-5'></FaHome></a></li>
                        </NavLink>
                            </>
                            :
                            <>
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
                            </>
                        }
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;