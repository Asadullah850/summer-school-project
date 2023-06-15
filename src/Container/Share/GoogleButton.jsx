import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const GoogleButton = () => {
    const [select, setSelect] = useState(false)
    const [status, setStatus] = useState('')
    const { googleLogin } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    // data.preventDefault()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)
        setSelect(true)
        setStatus(data.check)
    };

    const handelGoogleSingIn = () => {
        const roll = status
        // console.log('done', roll);
        // /userAdd
        googleLogin().then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // console.log(user);
            const displayName = user.displayName;
            const photoURL = user.photoURL;
            const email = user.email;
            const roll = status;
            const userData = {
                displayName, photoURL, email, roll
            }
            // console.log(userData);
            axiosSecure.post(`/userAdd`,userData).then(res => {
                // console.log(res);
                if (res.data.acknowledged) {
                    toast.success("Register Successful")
                    navigate('/')
                }
            }).catch((error) => {
                toast.error(error.message)
                // console.log(error);
            })
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log('errorMessage',errorCode, 'errorMessage', errorMessage, 'credential',credential);
            // ...
          });

    }

    return (
        <>
            {/* Open the modal using ID.showModal() method */}
            {
                select ? <button onClick={handelGoogleSingIn} className='btn mt-2 bg-transparent border-none'><FcGoogle className='text-5xl'></FcGoogle></button>
                    :
                    <button className="btn" onClick={() => window.my_modal_2.showModal()}>
                        <FcGoogle className='text-5xl'></FcGoogle>
                    </button>
            }
            {/* Open the modal using ID.showModal() method */}

            <dialog id="my_modal_2" className="modal">
                <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Pleas select after click Out side</h3>
                    <p>Student</p>
                    <input {...register("check", { required: true })} type="radio" value="Student" />
                    <p>Instructor</p>
                    <input {...register("check", { required: true })} type="radio" value="Instructor" />
                    <br />
                    <input className='btn btn-sm' type="submit" />
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </>
    );
};

export default GoogleButton;