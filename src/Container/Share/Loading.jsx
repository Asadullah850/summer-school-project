import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/sweetloading.json";

const Loading = () => {
    return (
        <div >
            <Lottie className='h-[50vh]' animationData={groovyWalkAnimation} loop={true} />;
        </div>
    );
};

export default Loading;