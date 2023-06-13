import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import PageTitle from '../PageTitle';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Feedback = () => {
    const { id } = useParams();
    // const [loading, setLoading] = useState(true)
    // const [singleClass, setSingleClass] = useState([])
    const [axiosSecure] = useAxiosSecure()
// find classes or feedback
    const { data: singleClass = [], isLoading, refetch} = useQuery(['singleClass', id], async ()=>{
        const res = await axiosSecure.get(`/singleClass/${id}`)
        return res.data
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    const handelSubmitFeedback =(event)=>{
        event.preventDefault()
        const form = event.target
        const feedback = form.feedback.value;
        const img = singleClass.ClassImageUrl;
        const className = singleClass.ClassName;
        const Status = singleClass.Status;
        const feedbackData = {
            feedback, img, className, Status
        }
        // console.log(feedbackData);
        axiosSecure.post(`feedback`, feedbackData)
        .then(res => {
            // console.log(res.data);
            if (res.data.acknowledged) {
                toast.success('Feedback Sending Successful')
            }
        })
    }

    return (
        <div>
            <PageTitle title={'feedback'}></PageTitle>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <figure><img className='h-60 w-full' src={singleClass.ClassImageUrl} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.ClassName}</h2>
                    <div className="lg:flex justify-center">
                        <p>Instructor Name: {singleClass.InstructorName}</p>
                        <p>Email: {singleClass.Email}</p>
                        <p>Price: {singleClass.Price}</p>
                        <p>AvailableSeats: {singleClass.AvailableSeats}</p>
                    </div>
                    {/* To Do menu barr resize */}
                    <form onSubmit={handelSubmitFeedback} action="">
                        <label className='uppercase font-semibold font-serif my-2' htmlFor="">write the {singleClass.Status} reason</label>
                        <textarea placeholder='Write The Feedback' className='border-2 p-2 border-[#060B50] my-2 rounded-md' name="feedback" id="" cols="100" rows="3"></textarea>
                        <div className="card-actions ">
                            <button type='submit' className="btn btn-primary w-[80%] mx-auto bg-[#060B50]">Send Feedback</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Feedback;