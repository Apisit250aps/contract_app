import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { delToken, getToken } from './auth.service';

const API_BASE_URL = 'http://localhost:3000';

export interface queryParams {
  limit: number
  page: number
}

export interface PaginationResult<T> {
  data: T[]
  currentPage: number
  totalPages: number
  totalItems: number
}


const handleSessionExpiration = () => {
  Swal.fire({
    title: 'Session Expired',
    text: 'Your session has expired. Please log in again.',
    icon: 'warning',
    confirmButtonText: 'OK',
    allowOutsideClick: false
  }).then(() => {
    delToken();
    window.location.href = '/auth/login';
  });
};

const apiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleSessionExpiration();
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default apiClient();