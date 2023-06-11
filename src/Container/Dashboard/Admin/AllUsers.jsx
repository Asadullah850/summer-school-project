import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import { FaTrash, FaUsersCog, FaUserGraduate, FaUserTie } from "react-icons/fa";
import PageTitle from '../PageTitle';

const AllUsers = () => {
    const [loading, setLoading] = useState(true)
    const [axiosSecure] = useAxiosSecure()
    const [userData, setUserData] = useState([])
    useEffect(() => {
        axiosSecure.get(`/allUsers`).then(res => {
            setUserData(res.data);
            setLoading(false)
            console.log(res.data);
        })
    }, [])
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <PageTitle title={'All user'}></PageTitle>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead >
                        <tr className=' uppercase text-white bg-[#060B50]'>
                            <th className=''>
                                <label>
                                    #
                                </label>
                            </th>
                            <th className=''>Name</th>
                            <th className=''>Email</th>
                            <th className=''>Role</th>
                            <th className=''>Action</th>
                            <th className=''>Feedback</th>
                            <th className=''>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((user, index) => <tr key={index}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <span className="badge badge-ghost badge-sm">{user.displayName}</span>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.roll === "admin" ?
                                        <FaUserTie></FaUserTie>
                                            :
                                            user.roll === "Instructor" ?
                                            <button className="btn btn-sm btn-outline">
                                                <FaUserGraduate></FaUserGraduate>
                                            </button>
                                                
                                                :
                                                user.roll
                                    }
                                </td>
                                <td>
                                    {
                                        user.roll === 'admin' ?
                                            <>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => handelMakeAdmin(user._id)} className="btn btn-sm bg-[#c07c16] hover:bg-[#513408] text-white text-xl">
                                                    <FaUserTie></FaUserTie>
                                                </button>
                                                <button onClick={() => handelMakeAdmin(user._id)} className="btn btn-sm bg-[#c07c16] hover:bg-[#513408] text-white text-xl">
                                                    <FaUsersCog></FaUsersCog>
                                                </button>
                                            </>
                                    }
                                </td>
                                <td>
                                    {/* To Do feed back button not work */}
                                    <button className="btn btn-sm "> Feedback</button>
                                </td>
                                <td>
                                    {/* To Do Delete button not work */}
                                    <button className="btn btn-ghost bg-red-600"><FaTrash className=' text-white'></FaTrash></button>
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;