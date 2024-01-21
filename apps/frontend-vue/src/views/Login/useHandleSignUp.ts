import type { AxiosInstance } from 'axios';
import { useHandleRequest } from '../../api/composables/useHandleRequest';

export const useHandleSignUp = (axiosInstance?: AxiosInstance) => {
  const { handleRequest, loading, error, response } =
    useHandleRequest(axiosInstance);

  const signupRequest = (username: string, password: string) => {
    if (username && password)
      handleRequest('POST', '/auth/signup', { username, password });
  };

  return { signupRequest, loading, error, response };
};
