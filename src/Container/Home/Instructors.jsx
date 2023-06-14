import React from 'react';

const Instructors = ({Instructor}) => {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">Instructor Name</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    );
};

export default Instructors;