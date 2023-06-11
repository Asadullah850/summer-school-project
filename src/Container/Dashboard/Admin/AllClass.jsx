import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import { FaTrash, FaUsersCog, FaUserGraduate, FaUserTie } from "react-icons/fa";
import PageTitle from '../PageTitle';


const AllClass = () => {

    const [loading, setLoading] = useState(true)
    const [axiosSecure] = useAxiosSecure()
    const [classesData, setClassesData] = useState([])

    useEffect(() => {
        axiosSecure.get(`/adminClassData`)
        .then(res => {
            setClassesData(res.data);
            console.log(res.data);
            setLoading(false)
        })
    }, [])
    if (loading) {
        return <Loading></Loading>
    }
    console.log(classesData);
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
                            <th className=''>Price</th>
                            <th className=''>Seats</th>
                            <th className=''>Status</th>
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
                                    <span className="badge badge-ghost badge-sm">{classData.ClassName}</span>
                                </td>
                                <td>
                                    <p>{classData.InstructorName}</p>
                                    <p>{classData.Email}</p>
                                </td>
                                <td>
                                    {classData.Price}
                                </td>
                                <td >
                                    {classData.AvailableSites}
                                </td>
                                <td className={classData.Status === 'Pending' ? ` text-red-800`: ``}>
                                    <button className={classData.Status === 'Pending' ? ` text-red-600 btn btn-sm font-bold`: `btn-sm`}>{classData.Status}</button>
                                </td>
                                <td>
                                    <button className='btn btn-sm'>feedback</button>
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