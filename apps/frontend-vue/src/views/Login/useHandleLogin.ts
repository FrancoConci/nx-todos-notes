import { useHandleRequest } from '../../api/composables/useHandleRequest';

export const useHandleLogin = () => {
  const { handleRequest, loading, error, response } = useHandleRequest();

  const loginRequest = (username: string, password: string) => {
    if (username && password)
      handleRequest('POST', '/auth/login', { username, password });
  };

  return { loginRequest, loading, error, response };
};
