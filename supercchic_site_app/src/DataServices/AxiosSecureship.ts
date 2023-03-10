import axios from 'axios';
import { IAuthData } from '../DataInterfaces/IUserData';

export const baseURL = 'https://secureship.ca';

const axiosInstanceSecureship = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
  },
});

axiosInstanceSecureship.interceptors.request.use((request) => {
  console.log(request.headers);

  return request;
})



export default axiosInstanceSecureship