import React, { useState } from 'react';
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.css'



const Card = ({ item }) => {
    const { ClassName, AvailableSeats, ClassImageUrl, Description, Price } = item;
    const [open, toggle] = useState(false)
    const [ref, { width }] = useMeasure()
    const props = useSpring({ width: open ? width : 0 })
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
                <div className="card-actions justify-end">
                    {
                        AvailableSeats == 0 ?
                         <button className='text-red-700' disabled="disabled">Booking</button> 
                        :
                            <div className={styles.container}>
                                <div ref={ref} className={styles.main} onClick={() => toggle(true)}>
                                    <animated.div className={styles.fill} style={props} />
                                    <animated.div className={styles.content}>
                                        <button > Booking</button>
                                    </animated.div>
                                </div>
                            </div>

                    }


                </div>
            </div>
        </div>
    );
};

export default Card;