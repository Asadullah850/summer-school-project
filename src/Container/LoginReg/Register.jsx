import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";


const Register = () => {
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [seePass, setSeePass] = useState(false);
    const [conPass, setConPass] = useState(false);

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        if (data.password !== data.ConfirmedPassword) {
            // console.log(confirmedPassword);
            return setConfirmedPassword("Pleas Confirmed Password");
        }
        console.log(data)
        // reset()
    };

    const handelPass = () =>{
        setSeePass(!seePass)
        // console.log(seePass);
    }
    const handelConPass = () =>{
        setConPass(!conPass)
        // console.log(seePass);
    }
    return (
        // 9B2A99 8F27A1
        <div className='lg:flex md:flex h-screen w-[99%] mx-auto bg-gradient-to-r from-[#9B2A99] to-[#8F27A1]'>
            <div className="w-1/2 bg-white rounded-br-[50%]">
                <div className="bg-[#9B2A99] w-32 h-32 mx-14 mt-10 rounded-bl-full rounded-tl-full rounded-br-full"></div>
            </div>
            <div className="w-1/2 max-h-screen my-auto">
                <h1 className='text-white font-bold text-4xl font-mono'>SSkarati</h1>
                <h1 className='text-white my-4 text-lg'>Register Your Account</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <input className='w-[70%] p-2 rounded-lg mb-2' type="text" placeholder="Full Name*" {...register("fullName", { required: true })} />
                    {errors.FullName?.type === 'required' && <p className='text-white' role="alert">Full Name is required</p>}
                    <br />
                    <input className='w-[70%] p-2 rounded-lg mb-2' type="email" placeholder="Email*" {...register("email", { required: true })} />
                    {errors.email?.type === 'required' && <p className='text-white p-0' role="alert">Email is required</p>}
                    <br />
                    <select className='w-[70%] p-2 rounded-lg mb-2'  placeholder="Email*" label="Select One" {...register("roll", { required: true })}>
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
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
                    {errors.password?.type === 'min' && <p  className='text-white p-0' role="alert">Password is upper 6</p>}
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
                    <Link className=' text-black' to='/'><p>All ready an account</p></Link>
                    <br />
                    <input className='w-[50%] btn bg-[#95289D] text-white hover:bg-[#720d79]' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Register;