import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { HiSun, HiMoon } from "react-icons/hi";
import useAxiosSecure from '../Hooks/useAxiosSecure';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Fade, Slide, Hinge, Zoom } from "react-awesome-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import PageTitle from '../Dashboard/PageTitle';
import Card from '../Card.jsx/Card';
import Instructors from './Instructors';
import Footer from '../Share/Footer';
import Offer from './Offer';
import Loading from '../Share/Loading';
import useAuth from '../Hooks/useAuth';


const Home = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth()

    const { data: allCard = [], isLoading, refetch, error } = useQuery(['allCard'], async () => {
        const res = await axiosSecure.get('/allCard');
        // console.log(res.data);
        return res.data;
    });
    const { data: offered = [], } = useQuery(['offered'], async () => {
        const res = await axiosSecure.get('/offeredCard');
        // console.log(res.data);
        return res.data
    });

    const { data: userInstructor = [], } = useQuery(['userInstructor'], async () => {
        const res = await axiosSecure.get('/userInstructor');
        // console.log(res.data);
        return res.data;
    });
    
    if (isLoading) {
        return <Loading></Loading>
    }
    // console.log(allCard);

    return (
        <div className="">
            <div className="">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        allCard.map(item => <SwiperSlide className=' h-screen lg:h-[500px]'>

                            <img className='w-full lg:h-[500px] h-screen' src={item.ClassImageUrl} alt="" srcset="" />
                            <p className='relative bottom-20 bg-black/70 text-xl font-bold w-[60%] mx-auto text-white p-2'>{item.ClassName}</p>

                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

            {/* Popular Classes Section */}
            <div className="">
                <div className=" text-center">
                    <PageTitle title={'Popular Classes Section'}></PageTitle>
                    <div className=" divider"></div>
                </div>
                <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    <Fade>
                        {
                            allCard.slice(0, 6).map(card => <Card item={card} key={card._id}></Card>)
                        }
                    </Fade>
                </div>
            </div>
            
            {/* Popular Instructors Section */}
            <div className="mt-2">
                <div className=" text-center my-2">
                    <PageTitle title={'Instructors'}></PageTitle>
                    <div className=" divider"></div>
                </div>
                <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    <Slide delay={1e1} cascade damping={1e-1}>
                        {
                            userInstructor.slice(0, 6).map(Instructor => <Instructors  Instructor={Instructor} key={Instructor._id}></Instructors>)
                        }
                    </Slide>
                </div>
            </div>
        
            {/* Extra Section */}
            <div className="mt-2">
                <div className=" text-center">
                    <PageTitle title={'Offer Classes'}></PageTitle>
                    <div className=" divider"></div>
                </div>
                <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    <Zoom delay={1e1} cascade damping={1e-1}>
                        {
                            offered.slice(0, 6).map(item => <Offer item={item} key={item._id}></Offer>)
                        }
                    </Zoom>
                </div>
            </div>
            {/* footer */}
            <Footer></Footer>
        </div>
    );
};

export default Home;