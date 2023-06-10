import React from 'react';

const PageTitle = ({title}) => {
    return (
        <div>
            <h1 className='text-2xl uppercase my-2 font-bold italic'>{title}</h1>
            <hr />
        </div>
    );
};

export default PageTitle;