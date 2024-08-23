import axiosInstance from "../config/apiConfig";
import { GetUsersResult, GetUserByIdResult } from "../types/users";

export type UsersStoreService = {
    getUsers: (page: number) => GetUsersResult;
    getUserById: (id: string) => GetUserByIdResult;
};

export const usersService = (): UsersStoreService => {
    return {
        getUsers: async(page: number) => {
            const response = await axiosInstance.get('/users', {params: {page: page, count: 6}});

            return response;
        },
        getUserById: async(id: string) => {
            const response = await axiosInstance.get(`/users/${id}`);

            return response.data;
        }
    }
}