import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const axiosOtpInstance = axios.create({
  baseURL: `${BACKEND_URL}/otp`,
});


export default axiosOtpInstance;
