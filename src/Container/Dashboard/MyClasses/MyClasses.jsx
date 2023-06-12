import React, { useEffect, useState } from 'react';
import PageTitle from '../PageTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Share/Loading';
import useAuth from '../../Hooks/useAuth';

const MyClasses = () => {
    const { user } = useAuth()
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axiosSecure.get(`/instructorClassData?Email=${user.email}`)
            .then(data => {
                setClasses(data.data);
                console.log(data.data);
                setLoading(false)
            })
    }, [])
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <PageTitle title={'my class'}></PageTitle>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#060B50] text-white uppercase'>
                            <th>#</th>
                            <th>ClassName</th>
                            <th>Status</th>
                            <th>AvailableSites</th>
                            <th>Add Site</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            classes.map((item, index) => <tr item={item} key={index}>
                                <th>{index + 1}</th>
                                <td>{item.ClassName}</td>
                                <td>{item.Status}</td>
                                <td>{item.AvailableSites}</td>
                                <td>
                                    {
                                        item.Status === "Pending" ? <><button disabled className="btn  btn-ghost btn-xs">Add Seat</button></>
                                            :
                                            <><button className="btn text-white bg-[#060B50] hover:btn-primary btn-xs">Add Seat</button></>
                                    }


                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;