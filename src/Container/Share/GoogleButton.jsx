import React from 'react';
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
    // updateProfile(getUser, {
    //     displayName: displayName, photoURL: photoURL
    // })
    //     .then(() => {
    //         // Profile updated!
    //         // console.log('Profile updated');
    //         // ...
    //     }).catch((error) => {
    //         setError(error)
    //     });

    // // console.log(user);
    // // ...
    // To do akhabe singin er kaj baki
    return (
        <button className='btn mt-2 bg-transparent border-none'><FcGoogle className='text-5xl'></FcGoogle></button>
    );
};

export default GoogleButton;