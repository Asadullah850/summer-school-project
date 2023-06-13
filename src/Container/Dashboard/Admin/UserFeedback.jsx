import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import PageTitle from '../PageTitle';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UserFeedback = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
// find classes for feedback
    const { data: single = [], isLoading, refetch} = useQuery(['user', id], async ()=>{
        const res = await axiosSecure.get(`/user/${id}`)
        return res.data
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    // console.log(single);
    const handelSubmitFeedback =(event)=>{
        event.preventDefault()
        const form = event.target
        const feedback = form.feedback.value;
        const email = form.email.value;
        const feedbackData = {
            feedback, email
        }
        // console.log(feedbackData);
        axiosSecure.post(`userFeedback`, feedbackData)
        .then(res => {
            // console.log(res.data);
            if (res.data.acknowledged) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thank"s For Your Feedback',
                    showConfirmButton: false,
                    timer: 1000
                  })
                navigate('/dashboard/allUsers')
            }
        })
    }
    return (
        <div>
            <PageTitle title={'user feedback'}></PageTitle>
            {
                single.map((user, index) => <div key={index} className="card card-compact w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title font-serif"> <span className=' uppercase'>{user.roll} Name : </span> {user.displayName}</h2>
                    <div className="lg:flex justify-center">
                        <p>Email: {user.email}</p>
                        <p>Roll: {user.roll}</p>
                    </div>
                    {/* To Do menu barr resize */}
                    <form onSubmit={handelSubmitFeedback} action="">
                        <label className='uppercase font-semibold font-serif my-2' htmlFor="">write the Feedback</label>
                        <input type="text" name="email" id="" className=' hidden' defaultValue={user.email} />
                        <textarea placeholder='Write The Feedback' className='border-2 p-2 border-[#060B50] my-2 rounded-md' name="feedback" id="" cols="100" rows="3"></textarea>
                        <div className="card-actions ">
                            <button type='submit' className="btn btn-primary w-[80%] mx-auto bg-[#060B50]">Send Feedback</button>
                        </div>
                    </form>

                </div>
            </div>)
            }
            
        </div>
    );
};

export default UserFeedback;