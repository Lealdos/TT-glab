import axios from 'axios';

// Create a base URL for your API
const API_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000'; 

// Create an axios instance with default config
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});