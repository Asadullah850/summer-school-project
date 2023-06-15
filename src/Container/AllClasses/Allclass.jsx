import React from 'react';
import PageTitle from '../Dashboard/PageTitle';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Fade } from 'react-awesome-reveal';
import Card from '../Card.jsx/Card';
import Offer from '../Home/Offer';
import Loading from '../Share/Loading';

const Allclass = () => {
    const [axiosSecure] = useAxiosSecure()

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

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title> SSDance | AllClass</title>
            </Helmet>
            <div className="text-center">
            <PageTitle title={'all class'}></PageTitle>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    <Fade>
                        {
                            allCard.map(card => <Card item={card} key={card._id}></Card>)
                        }
                    </Fade>
                </div>

                <div className="text-center my-4">
            <PageTitle title={'Offered Classes'}></PageTitle>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    <Fade>
                    
                        {
                            offered.map(item => <Offer item={item} key={item._id}></Offer>)
                        }
                    </Fade>
                </div>
        </div>
    );
};

export default Allclass;   