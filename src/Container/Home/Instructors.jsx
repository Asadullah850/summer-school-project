import React from 'react';

const Instructors = ({Instructor}) => {

    const { displayName, email, photoURL, roll} = Instructor;
    // console.log(Instructor);
    // Todo fine best roll
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img className='h-24 w-24 rounded-full' src={photoURL} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">Instructor Name : {displayName}</h2>
                <p>Email {email}</p>
                <p>Roll : {roll}</p>
                <p>Total Enroll : 10</p>
            </div>
        </div>
    );
};

export default Instructors;