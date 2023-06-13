import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import { FaTrash, FaUsersCog, FaUserGraduate, FaUserTie } from "react-icons/fa";
import PageTitle from '../PageTitle';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const AllClass = () => {
    const [axiosSecure] = useAxiosSecure()

    const { data: classesData = [], isLoading, refetch } = useQuery(['adminClassData'], async () => {
        const result = await axiosSecure.get(`/adminClassData`)
        return result.data
    })
    // console.log(classesData);

    const handelClassStatusUpdate = (id) => {
        const Status = 'Confirm'
        axiosSecure.patch(`/classStatusUpdate/${id}`, { Status })
            .then(res => {
                // console.log(id);
                // console.log(res.data);
                if (res.data.acknowledged) {
                    toast.success('Class Active')
                }
                refetch()
            })
        // console.log(roll);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <PageTitle title={'All classes'}></PageTitle>

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
                            <th className=''>ClassName</th>
                            <th className=''>Instructor Info</th>
                            <th className=''>Status</th>
                            <th className=''>denied</th>
                            <th className=''>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classesData.map((classData, index) => <tr key={index}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={classData.ClassImageUrl} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{classData.ClassName}</div>
                                        </div>
                                    </div>
                                    <span className="badge badge-ghost badge-sm"></span>
                                </td>
                                <td>
                                    <p>{classData.InstructorName}</p>
                                    <p>{classData.Email}</p>
                                </td>
                                <td>
                                    {
                                        classData.Status === 'Pending' ?
                                            <button onClick={() => handelClassStatusUpdate(classData._id)} className={classData.Status === 'Pending' ? ` text-red-600 btn bg-red-400 btn-sm font-bold` : `btn-sm`}>{classData.Status}</button>
                                            :
                                            <button className='btn btn-sm font-bold'>{classData.Status}</button>
                                    }

                                </td>
                                <td>
                                    {
                                        classData.Status === 'Pending' ?
                                            <Link to={`/dashboard/denied/${classData._id}`}>
                                                <button className='hover:bg-red-800 bg-red-600 text-white btn btn-sm font-bold'>denied</button>
                                            </Link>
                                            : 
                                            <button disabled className='hover:bg-red-800 disabled bg-red-600 text-white btn btn-sm font-bold'>denied</button>
                                        
                                    }

                                </td>
                                <td>
                                    <Link to={`/dashboard/feedback/${classData._id}`}>
                                        <button  className='btn btn-sm'>feedback</button>
                                    </Link>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllClass;