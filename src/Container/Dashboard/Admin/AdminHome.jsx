import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PageTitle from '../PageTitle';

const AdminHome = () => {
    // const [ axiosSecure ] = useAxiosSecure()
    // axiosSecure.get(`/allUsers`).then(res => {
    //     console.log(res.data);
    // })
    return (
        <div>
            <PageTitle title={'welcome Admin'}></PageTitle>
            <div className="stats shadow">

                <div className="stat place-items-center">
                    <div className="stat-title">Instratur</div>
                    <div className="stat-value">31K</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">4,200</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Class</div>
                    <div className="stat-value">1,200</div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;