import React, { useEffect, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import PageTitle from '../PageTitle';
import useAuth from '../../Hooks/useAuth';


const ClassAdd = () => {
    const { user } = useAuth()
    console.log(user);
    const inputRef = useRef(0);
    const [seat, setSeat] = useState(0);
    const [axiosSecure] = useAxiosSecure()

    // console.log(inputRef.current);
    const handleKeyUp = (event) => {
        const inputValue = event.target.value;
        setSeat(inputValue)
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const AvailableSeats = parseInt(data.AvailableSeats);
        const ClassImageUrl = data.ClassImageUrl;
        const ClassName = data.ClassName;
        const Email = data.Email;
        const InstructorName = data.InstructorName;
        const Price = parseInt(data.Price);
        const Status = data.Status;
        const roll = data.roll;
        const Description = data.Description
        const inputData = {
            AvailableSeats, ClassName, ClassImageUrl,Email, InstructorName, Price, Status, roll,Description
        }
       
        if (data.AvailableSeats == '0') {
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
        if (data.AvailableSeats < 0) {
            Swal.fire({
                position: 'top',
                width: 500,
                icon: 'error',
                title: 'Minus (-) Seat are not accepted',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        if (data.Price <= 100) {
            return toast.error("Price Less than 101 is not acceptable")
        }
        console.log(inputData);
        axiosSecure.post('/addClass', inputData)
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
                <select className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10'  {...register("ClassName", { required: true })}>
                    <option value=" Bangladeshi National Dance"> Bangladeshi National Dance</option>
                    <option value=" Africo Classic"> Africo Classic</option>
                    <option value=" American Fog Dance"> American Fog Dance</option>
                    <option value=" Ceremonial"> Ceremonial</option>
                    <option value=" Social Dance"> Social Dance</option>
                    <option value=" Bangla Classic"> Bangla Classic</option>
                    <option value=" Fog-dance"> Fog-dance</option>
                    <option value=" Break dance"> Break dance</option>
                    <option value=" Hip-Hop dance"> Hip-Hop dance</option>
                    <option value=" Swing-Dance"> Swing-Dance</option>
                    <option value="Indian Classic">Indian Classic</option>
                </select>
                {errors.ClassName?.type === 'required' && <p className='text-[#060B50] p-0' role="alert">ClassName is required</p>}


                <br />
                <label htmlFor="" className=' font-bold text-xl'> Image Url*</label>
                <input type="url" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' placeholder="Class Image URL*" {...register("ClassImageUrl")} required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Instructor name*</label>
                <input type="text" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' defaultValue={user?.displayName} readOnly {...register("InstructorName")} required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Available Seats </label>
                <input
                    ref={inputRef}
                    onKeyUp={handleKeyUp}
                    className={seat === 0 ? 'bg-red-700 lg:w-[70%] border-2 py-2 pl-4 rounded-md my-2 text-white mx-10' : 'lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10'}
                    type="number"
                    placeholder="Available Seats"
                    {...register("AvailableSeats")}
                    defaultValue={0}
                    required />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Price Per month</label>
                <input type="number" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' placeholder="Price" {...register("Price")} required />
                <br />
                <label htmlFor="" className='text-left font-bold text-xl '> Description</label> 
                <textarea className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10'  placeholder="Description" {...register("Description", {required: true})} />

                <input type="text" className=' hidden'{...register("Status")} defaultValue={'Pending'} />
                <input type="text" className=' hidden'{...register("roll")} defaultValue={'Instructor'} />
                <input type="text" className=' hidden'{...register("Email")} defaultValue={user?.email} />

                <input className='btn bg-[#060B50] text-white hover:bg-[#090b28] text-center w-[50%] mx-[15%] lg:my-5' type="submit" />
            </form>
        </div>
    );
};

export default ClassAdd;