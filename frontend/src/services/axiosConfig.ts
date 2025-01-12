import axios from 'axios';
import { redirect } from 'react-router';
const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to handle common request configurations
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add common headers here, like authentication tokens
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(
            error instanceof Error
                ? error
                : new Error(error.message || 'Request failed')
        );
    }
);

// Add response interceptor to handle common response scenarios
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common error scenarios here
        if (error.response?.status === 401) {
            // Handle unauthorized access
            sessionStorage.removeItem('authToken');
            redirect('/login');
        }
        return Promise.reject(
            error instanceof Error
                ? error
                : new Error(error.message || 'Response failed')
        );
    }
);
