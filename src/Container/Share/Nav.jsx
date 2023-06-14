import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Routes/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Nav = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const [roll, setRoll] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/users/admin/${user?.email}`).then(res => {
            setRoll(res.data);
            console.log(res.data);
        })
    }, [])

    // if (loading) {
    //     return 
    // }
    const userStatus = roll.roll

    const handelLogOut = () => {
        logOut()
        .then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="navbar fixed bg-[#0A1724]/50 z-10 text-white ">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">SSDance</a>
            </div>
            <div className="flex-none">
                <ul className=" flex px-1">
                    <NavLink to='/'>
                        <li className='bg-[#A82321] mx-1 lg:hidden md:hidden rounded-md px-4 py-2 hover:bg-[#a5100e]'>Home</li>
                    </NavLink>
                    <NavLink to='/dashboard'>
                        <li className='bg-[#A82321] mx-1 lg:hidden md:hidden rounded-md px-4 py-2 hover:bg-[#a5100e]'>Instructor</li>
                    </NavLink>
                    <NavLink to='/dashboard'>
                        <li className='bg-[#A82321] mx-1 lg:hidden md:hidden rounded-md px-4 py-2 hover:bg-[#a5100e]'>All Class</li>
                    </NavLink>


                    {
                        user ?
                            <>
                                <NavLink to={ userStatus == 'admin' ? '/dashboard/admin' : userStatus == 'Instructor' ? '/dashboard/instructor' : '/dashboard/studentClasses'}>
                                    <li className='bg-[#A82321] mx-1 rounded-md px-4 py-2 hover:bg-[#a5100e]'>Dashboard</li>
                                </NavLink>

                                <li onClick={handelLogOut} className='bg-[#A82321] py-2 mx-1 rounded-md  border-none text-white px-4 cursor-pointer hover:bg-[#a5100e]'>Logout</li>
                            </>
                            :
                            <>
                                <NavLink to='/login'>
                                <li className='bg-[#A82321] mx-1 cursor-pointer rounded-md px-4 py-2 hover:bg-[#a5100e]'><a>Login</a></li>
                                </NavLink>
                                <Link to='/register'>
                                    <li className='bg-[#A82321] mx-1 rounded-md px-4 py-2 hover:bg-[#a5100e]'><a>Register</a></li>
                                </Link>
                            </>
                    }

                </ul>

            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className=" text-center rounded-full">
                        {
                            user ? 
                            <img src={user.photoURL} alt="" srcset="" /> :
                            <FaUserCircle className='text-4xl '></FaUserCircle>
                        }
                    </div>
                </label>

                <ul tabIndex={0} className="group menu menu-sm hover:text-white hover:font-bold dropdown-content mt-2 p-2 shadow rounded-box ">

                    {
                        user ?

                            <li className='text-black group-hover:display'>
                                {user?.displayName || user?.email}
                            </li>

                            :
                            <>
                            </>
                    }


                </ul>
            </div>

        </div>
    );
};

export default Nav;