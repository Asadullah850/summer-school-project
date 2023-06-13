import React from 'react';
import Loading from '../../Share/Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageTitle from '../PageTitle';

const DeniedFeedback = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    // find classes for denied feedback
    const { data: singleClass = [], isLoading, refetch } = useQuery(['singleClass', id], async () => {
        const res = await axiosSecure.get(`/singleClass/${id}`)
        return res.data
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    const handelSubmitFeedback = (event) => {
        event.preventDefault()
        const form = event.target
        const feedback = form.feedback.value;
        const img = singleClass.ClassImageUrl;
        const className = singleClass.ClassName;
        const Status = 'Denied Class';
        const feedbackData = {
            feedback, img, className, Status
        }
        // console.log(feedbackData);
        axiosSecure.post(`feedback`, feedbackData)
            .then(res => {
                // console.log(res.data);
            })

    }
    const handelDenied = (id) => {
        console.log(id);
        axiosSecure.delete(`/classDenied/${id}`)
            .then(res => {
                // console.log(res.data);
                // toast.success("Delete")
                if (res.data.acknowledged) {
                    navigate('/dashboard/allClasses')
                }
            })
    }
    return (
        <div>
            <PageTitle title={'Denied feedback'}></PageTitle>
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
                            <button onClick={() => handelDenied(singleClass._id)} type='submit' className="btn btn-primary w-[80%] mx-auto bg-[#060B50]">Denied & Feedback</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeniedFeedback;