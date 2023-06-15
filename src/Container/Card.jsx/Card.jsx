import React, { useState } from 'react';
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.css'
import useAuth from '../Hooks/useAuth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';



const Card = ({ item }) => {
    const { ClassName, AvailableSeats,InstructorName, ClassImageUrl,Email, Description, Price, _id,enrollment } = item;
    const [open, toggle] = useState(false)
    const [ref, { width }] = useMeasure()
    const props = useSpring({ width: open ? width : 0 })
    const { user } = useAuth();
    const [ axiosSecure ] = useAxiosSecure()

    const handelBooking = (id) => {

        const userEmail = user.email;
        const userName = user.displayName;
        console.log(id);
        const bookingData = {
            ClassName, AvailableSeats, ClassImageUrl, Price,InstructorName,Email,enrollment,userEmail, userName, productId: _id
        }
        console.log(bookingData);
        axiosSecure.post('/booking', bookingData)
            .then(data => {
                if (data.data.acknowledged) {
                    toast.success("Class Booking Successfully")
                }
            }).catch((error) => {
                toast.error(error.message)
            })
    }
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={ClassImageUrl} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{ClassName}</h2>
                <p>{Description.slice(0, 100)}</p>
                <div className=" flex justify-between">
                    <p className='text-xl'>Price:TK {Price}</p>
                    <div className="">
                        <p className=''>AvailableSeats</p>
                        <p className='text-lg'>{AvailableSeats}</p>
                    </div>
                </div>
                {
                    user ?
                        <div className="card-actions justify-end">
                            {
                                AvailableSeats == 0 ?
                                    <button className='text-red-700' disabled="disabled">Booking</button>
                                    :
                                    <div className={styles.container}>
                                        <div ref={ref} className={styles.main} onClick={() => toggle(true)}>
                                            <animated.div className={styles.fill} style={props} />
                                            <animated.div onClick={() => handelBooking(_id)} className={styles.content}>
                                                <button > Booking</button>
                                            </animated.div>
                                        </div>
                                    </div>

                            }

                        </div>
                        :
                        <Link to='/login'>
                            <button  className='btn btn-primary bg-[#3a3838]' > Booking</button>
                        </Link>
                }

            </div>
        </div>
    );
};

export default Card;