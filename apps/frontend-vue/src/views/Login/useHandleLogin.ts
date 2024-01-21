import type { AxiosInstance } from 'axios';
import { useHandleRequest } from '../../api/composables/useHandleRequest';

export const useHandleLogin = (axiosInstance?: AxiosInstance) => {
  const { handleRequest, loading, error, response } =
    useHandleRequest(axiosInstance);

  const loginRequest = (username: string, password: string) => {
    if (username && password)
      handleRequest('POST', '/auth/login', { username, password });
  };

  return { loginRequest, loading, error, response };
};
