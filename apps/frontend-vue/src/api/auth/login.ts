import type { AxiosInstance } from 'axios';

export const login =
  (axiosInstance: AxiosInstance | undefined) =>
  async (username: string, password: string) => {
    if (!axiosInstance || !username || !password) return;
    const response = await axiosInstance
      .post('/auth/login', { username, password })
      .catch((error) => console.log(error));
    return response;
  };
