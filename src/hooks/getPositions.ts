import { useQuery } from "react-query";
import { GetUserPositionsProps } from "../types/users";
import axiosInstance, { API_BASE_URL } from "../config/apiConfig";

const fetchUserPositions = async (): Promise<GetUserPositionsProps> => {
    const response = await axiosInstance.get(`${API_BASE_URL}/positions`);
    return response.data;
};

export const useUserPositions = () => {
    const { data, error, isFetching, isLoading, isError, refetch } = useQuery<GetUserPositionsProps>(
      ['positions'], 
      fetchUserPositions, 
      {
        staleTime: 60000, 
        cacheTime: 300000, 
        refetchOnWindowFocus: true, 
        retry: 2, 
       
      }
    );
  
    return {
      data,
      error,
      isFetching,
      isLoading,
      isError,
      refetch,
    };
};