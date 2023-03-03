import axios from 'axios';
import { IAuthData } from '../DataInterfaces/IUserData';


export const baseAccessTokenName = "supercchic_access_token";
export const baseUserNameVariableName = "supercchic_user_name"
const baseRefreshTokenName = "supercchic_refresh_token"

const baseURL = 'http://ws1.postescanada-canadapost.ca';

const axiosInstanceCanadaPost = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds
});

export default axiosInstanceCanadaPost;
