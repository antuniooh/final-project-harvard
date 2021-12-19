import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:3334';

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token');

    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});


export default api;
