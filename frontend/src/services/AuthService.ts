import axios from 'axios';

const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

interface LoginData {
    email: string;
    password: string;
}

export const loginService = async (data: LoginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
};

export const logoutService = () => {
    localStorage.removeItem('authToken');
};
