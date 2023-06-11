import React, { useEffect } from 'react';
import useAuth from './Hooks/useAuth';
import useAxiosSecure from './Hooks/useAxiosSecure';

const Roll = () => {
    const { user,  loading} = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [roll, setRoll] = useState('');

    
    useEffect(() => {
        axiosSecure.get(`/users/admin/${user?.email}`).then(res => {
            setUserData(res.data);
            console.log(res.data);
        })
    }, [])

    return (

       
        <div>
            
        </div>
    );
};

export default Roll;