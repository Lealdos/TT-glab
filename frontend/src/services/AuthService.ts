import axios from 'axios';

const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

interface LoginData {
    email: string;
    password: string;
}

export const loginService = async (data: LoginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    sessionStorage.setItem('authToken', await response.data.access_token);

    return response.data;
};

export const logoutService = () => {
    sessionStorage.removeItem('authToken');
};
