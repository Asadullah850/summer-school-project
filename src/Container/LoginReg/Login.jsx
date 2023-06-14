import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import GoogleButton from '../Share/GoogleButton';
import { AuthContext } from '../Routes/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/144103-e-v-e.json";


const Login = () => {
    const [seePass, setSeePass] = useState(false);
    const { handelLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;

        handelLogin(email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const getUser = userCredential.user;
            // console.log(getUser);
            navigate('/')

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
    return (
        // 9B2A99 8F27A1
        <div className='lg:flex md:flex w-[99%] mx-auto bg-gradient-to-r from-[#9B2A99] to-[#8F27A1]'>
            <div className="lg:w-1/2 md:w-1/2 w-full bg-white rounded-br-[50%]">
                <div className="bg-[#9B2A99] w-20 h-20 mx-14 mt-10 rounded-bl-full rounded-tl-full rounded-br-full">
                </div>
                <h1 className='font-bold text-4xl font-serif'>SSDance</h1>
                <label htmlFor="">A summer school</label>
        
                    <Lottie className='h-[70vh]' animationData={groovyWalkAnimation} loop={true} />
               
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full my-auto text-center">
                <h1 className='text-white font-bold text-4xl font-mono'>SSDance</h1>
                <h1 className='text-white my-4 text-lg'>Login Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='w-[70%] p-2 rounded-lg mb-2' type="email" placeholder="Email*" {...register("email", { required: true })} />
                    {errors.email?.type === 'required' && <p className='text-white p-0' role="alert">Email is required</p>}
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
                    <p>123@Aa</p>
                    {errors.password?.type === 'required' && <p className='text-white p-0' role="alert">Password is required</p>}
                    {errors.password?.type === 'min' && <p className='text-white p-0' role="alert">Password is upper 6</p>}
                    {errors.password?.type === 'maxLength' && <p className='text-white p-0' role="alert">Password is less then 20</p>}
                    {errors.password?.type === 'pattern' && <p className='text-white p-0' role="alert">Password 6 creator one capital and small word one special creator</p>}
                    <br />

                    <Link className=' text-black' to='/register'><p className=' underline'>New account</p></Link>
                    <br />
                    <input className='w-[40%] btn bg-[#95289D] text-white hover:bg-[#720d79]' type="submit" value={'Login'} />
                </form>
                <GoogleButton></GoogleButton >
            </div>
        </div>
    );
};

export default Login;