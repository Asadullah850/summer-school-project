import React, { useEffect, useState } from 'react';
import PageTitle from '../PageTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const FeedbackPage = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [feedbackUser, setFeedbackUser] = useState([]);
    const [feedbackClasses, setFeedbackClasses] = useState([]);
    const [loading, setLoading] = useState(true);


    // const { data: classFeedback = [], isLoading, refetch } = useQuery(['classFeedback'], async () => {
    //     const res = await axiosSecure.get(`/classFeedback/${user.email}`)
    //     return res.data
    // })
    console.log(user.email);
    useEffect(() => {
        // console.log('painai');
        axiosSecure.get(`/classFeedback/${user.email}`).then(res => {
            console.log(res.data);
            setFeedbackClasses(res.data)
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <PageTitle title={'feedback page'}></PageTitle>
            <div className="lg:flex">
                <div className="lg:w-1/2 border-2 border-r-violet-950">
                    <h1 className=' font-semibold font-serif text-lg'>Classes Feedback</h1>
                    <p>Total Feedback : {feedbackClasses.length}</p>
                    {/* <td>{index + 1}</td>
                    <td>{item.className}</td>
                    <td>{item.Status}</td> */}
                    {
                        feedbackClasses.map((item, index)=> <div key={index}>
                            <div className="flex border p-2 shadow-lg justify-between">
                                <p>No: {index + 1}</p>
                                <p>Name: {item.className}</p>
                            </div>
                            <div className="text-left m-2">
                            <span className=' '>Feed Back</span>
                            </div>
                            <p className=' overflow-y-scroll h-20 border-t-2 border-b-2 rounded-md'>{item.feedback}</p>
                        </div>)
                    }

                </div>
                <div className="lg:w-1/2">
                    <h1 className=' font-semibold font-serif text-lg'>Personal Feedback</h1>
                    <p>Total Feedback : </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;