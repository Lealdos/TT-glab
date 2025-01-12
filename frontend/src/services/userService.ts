import {axiosInstance} from './axiosConfig';



interface RegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerUserService = async (data: RegisterUserData) => {
    return axiosInstance.post(`/users/register`, data);
};
