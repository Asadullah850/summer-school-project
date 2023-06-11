import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const useAdmin = () => {
    const { user,  loading} = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['User', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;