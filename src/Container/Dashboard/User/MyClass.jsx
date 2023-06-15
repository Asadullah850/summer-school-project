import React, { useEffect, useState } from 'react';
import PageTitle from '../PageTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Share/Loading';
import Swal from 'sweetalert2';

const MyClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth()


    const { data: bookingClasses = [], isLoading, refetch } = useQuery(['bookingClasses'], async () => {
        const res = await axiosSecure.get(`/bookingClasses/${user.email}`)
        return res.data
    })

    const handleDelete = (id)=>{
        axiosSecure.delete(`/classDenied/${id}`)
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

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <PageTitle title={'My Classes'}></PageTitle>
            <p>bookingClasses: {bookingClasses.length}</p>
            <div className=" flex">
                <p>Total Booking: {bookingClasses.length}</p>
                <p>Total Price:</p>
            <button className='btn btn-sm'>Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    #
                                </label>
                            </th>
                            <th>Name</th>
                            <th>
                                Status
                            </th>
                            <th>AvailableSeats</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookingClasses.map((item,index)=><tr>
                            <th>
                                <label>
                                  {index + 1}
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.ClassImageUrl} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.ClassName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Booking
                            </td>
                            <td>
                            {item.AvailableSeats}
                            </td>
                            <th>
                                <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost bg-red-600 text-white btn-xs">Delete</button>
                            </th>
                        </tr>)
                        }
                        
                        
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>AvailableSeats</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default MyClass;