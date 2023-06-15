import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Slide } from "react-awesome-reveal";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Share/Loading';
import Instructors from '../Home/Instructors';
import PageTitle from '../Dashboard/PageTitle';

const InstructorsPage = () => {
    const [ axiosSecure ] =useAxiosSecure()
    const { data: userInstructor = [], isLoading, refetch, error} = useQuery(['userInstructor'], async () => {
        const res = await axiosSecure.get('/userInstructor');
        // console.log(res.data);
        return res.data;
    });
    
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>
                    SSDance | Instructors
                </title>
            </Helmet>
            <PageTitle title={" Instructors Page"}></PageTitle>
            <div className=" mt-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    <Slide delay={1e1} cascade damping={1e-1}>
                        {
                            userInstructor.slice(0, 6).map(Instructor => <Instructors  Instructor={Instructor} key={Instructor._id}></Instructors>)
                        }
                    </Slide>
                </div>
        </div>
    );
};

export default InstructorsPage;