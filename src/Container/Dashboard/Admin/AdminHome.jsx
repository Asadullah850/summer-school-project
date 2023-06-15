import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PageTitle from '../PageTitle';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Share/Loading';

const AdminHome = () => {
    const [ axiosSecure ] = useAxiosSecure()
    // axiosSecure.get(`/allUsers`).then(res => {
    //     console.log(res.data);
    // })
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-status'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    // console.log(stats)
    return (
        <div>
            <PageTitle title={'welcome Admin'}></PageTitle>
            <div className="stats shadow">

            <div className="stat place-items-center">
                    <div className="stat-title">Student</div>
                    <div className="stat-value text-secondary">{stats.Student.length}</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Booking Classes</div>
                    <div className="stat-value text-red-600">{stats.booking}</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Class</div>
                    <div className="stat-value">{stats.products}</div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;