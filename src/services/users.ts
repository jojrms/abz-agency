import axiosInstance from "../config/apiConfig";
import { GetUsersResult, GetUserByIdResult, GetUserPositionsResult, GetUserToken } from "../types/users";

export type UsersStoreService = {
    getUsers: (page: number) => GetUsersResult;
    getUserById: (id: string) => GetUserByIdResult;
    getToken: () => GetUserToken;
};

export const usersService = (): UsersStoreService => {
    return {
        getToken: async() => {
            const response = await axiosInstance.get('/token');
            localStorage.setItem('authToken', response.data.token);

            return response;
        },
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

// ~~~ POSITIONS ~~~ 

export type UserPositionsStoreService = {
    getUserPositions: () => GetUserPositionsResult;
};

export const positionsService = (): UserPositionsStoreService => {
    return {
        getUserPositions: async() => {
            const response = await axiosInstance.get('/positions');

            return response;
        },
        
    }
}