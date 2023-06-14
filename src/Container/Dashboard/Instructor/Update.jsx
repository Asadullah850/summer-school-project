import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Share/Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import PageTitle from '../PageTitle';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Update = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate()


    const { data: singleClass = [], isLoading, refetch } = useQuery(['singleClass', id], async () => {
        const res = await axiosSecure.get(`/singleClass/${id}`)
        return res.data
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const AvailableSeats = parseInt(data.AvailableSeats);
        const Price = parseInt(data.Price);
        const Description = data.Description;
        const inputData = {
            AvailableSeats, Price, Description
        }
        console.log(inputData);
        axiosSecure.patch(`/classUpdate/${id}`,inputData)
            .then(res => {      
                // console.log(id);
                // console.log(inputData);
                console.log(res.data);
                if (res.data.acknowledged) {
                    toast.success('Class Updated')
                    navigate('//dashboard/myclasses')
                }
            })
            refetch()
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <PageTitle title={'update class'}></PageTitle>
            <form className='text-right' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="" className=' font-bold text-xl'> Class name*</label>
                <input type="text" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' defaultValue={singleClass.ClassName} readOnly {...register("ClassName")} />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Available Seats </label>
                <input
                    className={'lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10'}
                    type="number"
                    defaultValue={singleClass.AvailableSeats}
                    {...register("AvailableSeats")}
                />
                <br />
                <label htmlFor="" className=' font-bold text-xl'> Price Per month</label>
                <input type="number" className='lg:w-[70%] border-2 p-2 rounded-md my-2 mx-10' defaultValue={singleClass.Price} {...register("Price")} />
                <br />
                <textarea className='w-[70%] border-2 p-2 rounded-md my-2 border-blue-900 mx-10' rows={8} defaultValue={singleClass.Description} {...register("Description")} />
                <input className='btn bg-[#060B50] text-white hover:bg-[#090b28] text-center w-[50%] mx-[15%] lg:my-5' type="submit" />
            </form>
        </div>
    );
};

export default Update;