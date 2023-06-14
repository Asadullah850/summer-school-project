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
                        <li className='py-2 px-4  mx-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137]'>Home</li>
                    </NavLink>
                    <li className='py-2 px-4  mx-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137]'><a>All Class</a></li>
                    <li className='py-2 px-4  mx-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137] '><a>Instructors</a></li>
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
                            <>
                                <li className='py-1 px-4 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl hover:bg-[#0b2137]'>
                                    {user?.displayName || user?.email}
                                </li>
                                <NavLink to={userStatus == 'admin' ? '/dashboard/admin' : userStatus == 'Instructor' ? '/dashboard/instructor' : '/dashboard/studentClasses'}>
                                    <li className='py-2 px-4  m-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137]'>Dashboard</li>
                                </NavLink>

                                <li onClick={handelLogOut} className='py-2 px-4  m-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137]'>Logout</li>
                            </>



                            :
                            <>
                                <NavLink to='/login'>
                                    <li className='py-2 px-4  m-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137]'><a>Login</a></li>
                                </NavLink>
                                <Link to='/register'>
                                    <li className='py-2 px-4  m-1 border-2 bg-[#0A1724] text-white rounded-r-2xl rounded-bl-2xl cursor-pointer hover:bg-[#0b2137]'><a>Register</a></li>
                                </Link>
                            </>
                    }


                </ul>
            </div>

        </div>
    );
};

export default Nav;