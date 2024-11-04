import axios from 'axios';

const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

interface LoginData {
    email: string;
    password: string;
}

export const loginService = async (LoginData: LoginData) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, LoginData);
    return data;
};

export const logoutService = () => {
    sessionStorage.removeItem('authToken');
};
