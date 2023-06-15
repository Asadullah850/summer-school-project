import React from 'react';
import axios from 'axios';

const useAxiosSecure = () => {

const axiosSecure = axios.create({
  baseURL: 'https://assingment12-server-eight.vercel.app',
});

  return  [axiosSecure]
};

export default useAxiosSecure;