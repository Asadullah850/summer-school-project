import React from 'react';
import { useQuery } from '@tanstack/react-query'

const UseClassData = () => {
    const { refetch, isLoading, isError, data: classes =[], error } = useQuery({
        // TO Do akhane email dea card fech / axios kora lagbe 77-4
        queryKey: ['classes'],
        queryFn: async ()=>{
            const response  = await fetch(`https://assingment12-server-eight.vercel.app/`)
            return response.json();
        },
      })
      if (isLoading) {
        return <span>Loading...</span>
      }
    
    return [ classes, refetch]
};

export default UseClassData;