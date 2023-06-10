import React, { useEffect, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PageTitle from '../PageTitle';


const ClassAdd = () => {
    const inputRef = useRef(null);
    const [seat, setSeat] = useState(0);
    const email = 'user.email@defaultValue';
    const [axiosSecure] = useAxiosSecure()

    // console.log(inputRef.current);
    const handleKeyUp = (event) => {
        const inputValue = event.target.value;
        setSeat(inputValue)
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        if (data.AvailableSites == '0') {
            Swal.fire({
                position: 'top',
                width: 500,
                icon: 'error',
                title: '0 Seat are not accepted',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        axiosSecure.post('addClass', data)
            .then(data => {
                if (data.data.acknowledged) {
                    toast.success("Class Add it's Pending")
                }
            }).catch((error) => {
                toast.error(error.message)
            })

        reset()
    }

    return (
        <div className=' mt-4 '>
            <ToastContainer />
            <PageTitle title={'Add Class'}></PageTitle>
            <form className='text-right' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="" className=' font-bold text-xl'> Class name*</label>
                <input type="text" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' placeholder="Class name*" {...register("ClassName")} required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Image Url*</label>
                <input type="url" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' placeholder="Class Image URL*" {...register("ClassImageUrl")} required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Instructor name*</label>
                <input type="text" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' placeholder="Instructor Name*" {...register("InstructorName")} required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Class name*</label>
                <input
                    ref={inputRef}
                    onKeyUp={handleKeyUp}
                    className={seat === 0 ? 'bg-red-700 lg:w-[70%] border-2 py-2 pl-4 rounded-md my-2 text-white mx-10' : 'lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10'}
                    type="number"
                    placeholder="Available Sites*"
                    {...register("AvailableSites")}
                    defaultValue={0}
                    required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Class name*</label>
                <input type="number" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' placeholder="Price" {...register("Price*")} required />
                <br />
                <input type="text" className=' hidden'{...register("Status")} defaultValue={'Pending'} />
                <input type="text" className=' hidden'{...register("roll")} defaultValue={'Instructor'} />
                <input type="text" className=' hidden'{...register("Email")} defaultValue={email} />

                <input className='btn bg-[#060B50] text-white hover:bg-[#090b28] text-center w-[50%] mx-[15%] lg:my-5' type="submit" />
            </form>
        </div>
    );
};

export default ClassAdd;