import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const axiosNoteInstance = axios.create({
    baseURL: `${BACKEND_URL}/note`
})

    axiosNoteInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

export default axiosNoteInstance;