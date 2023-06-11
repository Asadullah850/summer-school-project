import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import GoogleButton from '../Share/GoogleButton';
import { AuthContext } from '../Routes/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';


const Register = () => {
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [seePass, setSeePass] = useState(false);
    const [conPass, setConPass] = useState(false);
    const { newUserLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const [axiosSecure] = useAxiosSecure()

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const displayName = data.fullName;
        const email = data.email;
        const password = data.password;
        const photoURL = data.url
        const userData = {
            displayName: data.fullName,
            email: data.email,
            photoURL: data.url,
            roll: data.roll
        }
        if (data.password !== data.ConfirmedPassword) {
            // console.log(confirmedPassword);
            return setConfirmedPassword("Password Not Equal");
        }
        newUserLogin(email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const getUser = userCredential.user;
            // console.log(getUser);
                updateProfile(getUser, {
                    displayName: displayName, photoURL: photoURL
                  })
                  .then(() => {
                    // Profile updated!
                    // console.log('Profile updated');
                    // ...
                  }).catch((error) => {
                    setError(error)
                  });
                  
            // console.log(user);
            // ...
            navigate('/')
            axiosSecure.post(`/userAdd`,userData).then(res => {
                // console.log(res);
                if (res.data.acknowledged) {
                    toast.success("Add SeccesFull")
                }
                navigate('/')
            }).catch((error) => {
                toast.error(error.message)
                console.log(error);
            })

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
        // console.log(userData, password)

        reset()
    };

    const handelPass = () => {
        setSeePass(!seePass)
        // console.log(seePass);
    }
    const handelConPass = () => {
        setConPass(!conPass)
        // console.log(seePass);
    }
    return (
        // 9B2A99 8F27A1
        <div className='lg:flex md:flex w-[99%] mx-auto  lg:h-screen bg-gradient-to-r from-[#9B2A99] to-[#8F27A1]'>
            <div className="lg:w-1/2 md:w-1/2 w-full bg-white rounded-br-[50%]">
                <div className="bg-[#9B2A99] w-32 h-32 mx-14 mt-10 rounded-bl-full rounded-tl-full rounded-br-full">
                </div>
                <h1 className='font-bold text-4xl font-serif'>SSDance</h1>
                <label htmlFor="">A summer school</label>
                <div className=" divider"></div>
                <div className=" text-lg font-semibold mx-4">
                    <li>A stitch in time, saves nine</li>
                    <li>Knowledge is the greatest wealth</li>
                    <li>A quick brown fox jumps over the lazy dog.</li>
                </div>
               
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full my-auto">
                <h1 className='text-white font-bold text-4xl font-mono max-sm:hidden '>SSDance</h1>
                <h1 className='text-white my-4 text-lg '>Register Your Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='w-[70%] p-2 rounded-lg mb-2' type="text" placeholder="Full Name*" {...register("fullName", { required: true })} />
                    {errors.FullName?.type === 'required' && <p className='text-white' role="alert">Full Name is required</p>}
                    <br />
                    <input className='w-[70%] p-2 rounded-lg mb-2' type="email" placeholder="Email*" {...register("email", { required: true })} />
                    {errors.email?.type === 'required' && <p className='text-white p-0' role="alert">Email is required</p>}
                    <br />
                    <input className='w-[70%] p-2 rounded-lg mb-2' type="url" placeholder="Image Url*" {...register("url", { required: true })} />
                    {errors.url?.type === 'required' && <p className='text-white p-0' role="alert">Image is required</p>}
                    <select className='w-[70%] p-2 rounded-lg mb-2 hidden' placeholder="Email*" label="Select One" {...register("roll", { required: true })}>
                        <option value="User">User</option>
                    </select>
                    <br />
                    <label onClick={handelPass} className='btn btn-sm font-bold my-1 right-24 absolute' htmlFor="">
                        {
                            seePass ? <><FaEye className=' text-xl'></FaEye></> :
                                <><FaEyeSlash className=' text-xl'></FaEyeSlash></>
                        }
                    </label>
                    <input className='w-[70%] p-2 rounded-lg mb-2' type={
                        seePass ? `text` : `password`
                    } placeholder="Password*" {...register("password", {
                        required: true,
                        min: 6,
                        maxLength: 20,
                        pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}/
                    })} />
                    {errors.password?.type === 'required' && <p className='text-white p-0' role="alert">Password is required</p>}
                    {errors.password?.type === 'min' && <p className='text-white p-0' role="alert">Password is upper 6</p>}
                    {errors.password?.type === 'maxLength' && <p className='text-white p-0' role="alert">Password is less then 20</p>}
                    {errors.password?.type === 'pattern' && <p className='text-white p-0' role="alert">Password 6 creator one capital and small word one special creator</p>}
                    <br />
                    <label onClick={handelConPass} className='btn btn-sm font-bold my-1 right-24 absolute' htmlFor="">
                        {
                            conPass ? <><FaEye className=' text-xl'></FaEye></> :
                                <><FaEyeSlash className=' text-xl'></FaEyeSlash></>
                        }
                    </label>
                    <input className={`w-[70%] p-2 rounded-lg mb-2`} type={
                        conPass ? `text` : `password`
                    } placeholder="Confirmed Password*" {...register("ConfirmedPassword", {
                        required: true,
                        min: 6,
                        maxLength: 20,
                    })} />
                    {errors.ConfirmedPassword?.type === 'required' && <p className='text-white p-0' role="alert">Confirmed your Password</p>}
                    <p className='text-white p-0'>{confirmedPassword}</p>
                    <Link className=' text-black' to='/login'><p className=' underline'>All ready an account</p></Link>
                    <br />
                    <input className='w-[50%] btn bg-[#95289D] text-white hover:bg-[#720d79]' type="submit" />
                </form>
            <GoogleButton></GoogleButton>
            </div>
        </div>
    );
};

export default Register;