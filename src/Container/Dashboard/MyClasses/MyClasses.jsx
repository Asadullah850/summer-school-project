import React, { useEffect, useState } from 'react';
import PageTitle from '../PageTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyClasses = () => {
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/classData?Email=user.email@defaultValue`)
            .then(data => {
                setClasses(data.data);
                console.log(data.data);
            })
    }, [])

    return (
        <div>
            <PageTitle title={'my class'}></PageTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
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