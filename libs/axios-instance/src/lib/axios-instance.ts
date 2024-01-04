import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { rejectHandler, responseHandler } from './interceptorFunctions';

export const getAxiosInstance = (
  baseUrl: string,
  timeout?: number,
  config?: AxiosRequestConfig
) => {
  return axios.create({
    baseURL: baseUrl ?? 'http://localhost:3000',
    timeout: timeout ?? 1000,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Credentials': true,
    },
    ...config,
  });
};

export const addResponseInterceptor = (
  axiosInstance: AxiosInstance,
  setErrorToState: (id: string, message: string) => void
) => {
  axiosInstance.interceptors.response.use(
    responseHandler,
    rejectHandler(setErrorToState)
  );
};
