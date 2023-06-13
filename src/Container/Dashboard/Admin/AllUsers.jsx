import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import { FaTrash, FaUsersCog, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import PageTitle from '../PageTitle';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AllUsers = () => {
    // const [loading, setLoading] = useState(true);
    const [axiosSecure] = useAxiosSecure();
    // const [userData, setUserData] = useState([]);
    const [roll, setRoll] = useState('Instructor')

// To do use tanstack query for user load
    // useEffect(() => {
    //     axiosSecure.get(`/allUsers`).then(res => {
    //         setUserData(res.data);
    //         setLoading(false)
    //         // console.log(res.data);

    //     })
    // }, [])
    const { data: userData = [], isLoading, refetch } = useQuery(['userData'], async () => {
        const res = await axiosSecure.get(`/allUsers`)
        return res.data
    })

    const handelInstructor = (id) => {
        event.preventDefault()

        axiosSecure.patch(`/updateStatus/${id}`, { roll })
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged) {
                    toast.success("Update Instructor")
                    refetch()
                    
                }
                // acknowledged
            })
            
    }

    const handelAdmin = (id, admin) => {
        event.preventDefault()
        const roll = admin
        axiosSecure.patch(`/updateStatus/${id}`, { roll })
            .then(res => {
                console.log(res.data);

                if (res.data.acknowledged) {
                    toast.success("Update Admin")
                    refetch()
                    
                }
                // acknowledged
            })
            
    }
    const handelDelete = (id) => {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            // if (res.data.acknowledged) {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/userDelete/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.acknowledged) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                              refetch()
                        }
                    })
                    
                  }
          })
       
            
    }
    if (isLoading) {
        return <Loading></Loading>
    }

    // /updateStatus

    return (
        <div>
            
            <PageTitle title={'All user'}></PageTitle>
            <div className=" w-full">
                <table className="table w-full ">
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
                                            <div className="">
                                                <FaUserTie className='h-8 w-10'></FaUserTie>
                                                <span>Admin</span>
                                            </div>

                                            :
                                            user.roll === "Instructor" ?
                                                <div className="">
                                                    <FaUserGraduate className='h-8 w-10'></FaUserGraduate>
                                                    <span className=' text-xs'>Instructor</span>
                                                </div>

                                                :

                                                <div className="">
                                                    <GrUserManager className='h-8 w-10'></GrUserManager>
                                                    <span className=' text-xs'>Student</span>
                                                </div>
                                    }
                                </td>
                                <td>
                                    {
                                        user.roll === 'admin' ?
                                            <>
                                            </>
                                            :

                                            <>


                                                <button onClick={() => handelInstructor(user._id)} className="btn btn-sm bg-[#c07c16] hover:bg-[#513408] text-white text-xl">
                                                    <FaUserGraduate></FaUserGraduate>
                                                </button>

                                                <button onClick={() => handelAdmin(user._id, 'admin')} className="btn btn-sm bg-[#c07c16] hover:bg-[#513408] text-white text-sm">
                                                    admin
                                                </button>
                                            </>
                                    }
                                </td>
                                <td>
                                    {/* To Do feed back button not work */}
                                    <button className="btn btn-sm "> Feedback</button>
                                </td>
                                <td>
                                    <button onClick={()=>handelDelete(user._id)} className="btn btn-ghost bg-red-600"><FaTrash className=' text-white'></FaTrash></button>
                                </td>
                            </tr>
                            )
                        }
                        {/* row 1 */}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;