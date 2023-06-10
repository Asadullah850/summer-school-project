import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Loading from '../Share/Loading';

const PrivetRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if (loading){
        return <Loading></Loading>
    }
    if (user) {
        return children
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;