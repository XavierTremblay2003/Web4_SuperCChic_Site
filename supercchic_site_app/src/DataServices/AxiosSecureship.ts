import axios from 'axios';
import { IAuthData } from '../DataInterfaces/IUserData';

export const baseURL = 'https://secureship.ca';

const axiosInstanceSecureship = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

axiosInstanceSecureship.interceptors.request.use((request) => {
  console.log(request.headers);

  return request;
})



export default axiosInstanceSecureship