import { useHandleRequest } from '../../api/composables/useHandleRequest';

export const useHandleSignUp = () => {
  const { handleRequest, loading, error, response } = useHandleRequest();

  const signupRequest = (username: string, password: string) => {
    if (username && password)
      handleRequest('POST', '/auth/signup', { username, password });
  };

  return { signupRequest, loading, error, response };
};
