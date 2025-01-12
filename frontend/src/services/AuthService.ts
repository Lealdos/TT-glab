import { axiosInstance } from './axiosConfig';
interface LoginData {
    email: string;
    password: string;
}

export const loginService = async (loginData: LoginData) => {
    const { data: token } = await axiosInstance.post('/auth/login', loginData);
    return token;
};

export const logoutService = () => {
    sessionStorage.removeItem('authToken');
};
