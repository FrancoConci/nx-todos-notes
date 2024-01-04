import { AxiosError, AxiosResponse } from 'axios';

export const responseHandler = (response: AxiosResponse) => {
  return response;
};

export const rejectHandler =
  (setErrorToState: (id: string, message: string) => void) =>
  (error: AxiosError) => {
    setErrorToState(`${new Date().getTime()}`, error.message);
    return Promise.reject(error);
  };
