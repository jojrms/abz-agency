import { useQuery } from "react-query";
import axiosInstance from "../config/apiConfig";
import { useState } from "react";
import { GetUsersProps } from "../types/users";

const fetchUsers = async (page: number): Promise<GetUsersProps> => {
  const response = await axiosInstance.get(`/users`, {params: {page: page, count: 6}});
  return response.data;
};

export const fetchUserToken = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get('/token');

    if (!response.data || !response.data.token) {
      throw new Error(`Invalid response data: ${response.statusText}`);
    }

    const { token } = response.data;

    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error fetching user token:', error);
    throw error;
  }
};

export const useUsers = () => {
    const [page, setPage] = useState(1);
    
    const { data, error, isFetching, isLoading, isError, refetch, isRefetching } = useQuery<GetUsersProps>(
      ['users', page], 
      () => fetchUsers(page), 
      {
        keepPreviousData: true, 
      }
    );

    const nextPage = () => {
        if (data && data.page && data.total_pages && data.page < data.total_pages) {
          setPage(prevPage => prevPage + 1);
        }
    };

    const fetchPage = (refetchPage: number) => {
      setPage(refetchPage);
      refetch();
    };
  
    return {
      data: data,
      error,
      isFetching,
      isRefetching,
      isLoading,
      isError,
      refetch: fetchPage,
      nextPage
    };
};