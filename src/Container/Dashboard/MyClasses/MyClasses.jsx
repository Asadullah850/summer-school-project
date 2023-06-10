import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyClasses = () => {
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure()

    axiosSecure.get('http://localhost:5000/addClass')
    .then(data => {
       console.log(data); 
    })

    return (
        <div>
            <PageTitle title={'my class'}></PageTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;