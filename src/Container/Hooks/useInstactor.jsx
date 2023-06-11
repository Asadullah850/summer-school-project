import React from 'react';
import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
    const { data: menu= [], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() =>{
            const res = await fetch('/menu')
            return res.json();
        }

    })
    console.log(menu);
    return [menu, loading, refetch]
};

export default useInstructor;