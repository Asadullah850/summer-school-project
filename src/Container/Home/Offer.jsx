
import React, { useState } from 'react';
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.css'
import useAuth from '../Hooks/useAuth';
import { Link } from 'react-router-dom';

const Offer = ({item}) => {
    const { ClassName, AvailableSeats,offered, ClassImageUrl, Description, Price } = item;
    const [open, toggle] = useState(false)
    const [ref, { width }] = useMeasure()
    const props = useSpring({ width: open ? width : 0 })
    const { user } = useAuth()
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img className='h-40 rounded-md' src={ClassImageUrl} alt="Shoes" /></figure>
            <div className="card-body">
            <h2 className="card-title">
            {ClassName}
      <div className="badge badge-secondary">{offered}</div>
    </h2>
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

export default Offer;