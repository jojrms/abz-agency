export const API_BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

export const fetchHeaders = {
    'Content-Type': 'application/json',
};