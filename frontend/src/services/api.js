import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const API = axios.create({
    baseURL: BASE_URL
});

// attack token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

export default API;