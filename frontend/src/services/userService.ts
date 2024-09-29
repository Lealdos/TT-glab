// src/services/userService.ts
import axios from 'axios';

const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';
interface RegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerUserService = async (data: RegisterUserData) => {
    return axios.post(`${API_URL}/users/register`, data);
};
