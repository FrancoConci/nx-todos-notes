import type { AxiosInstance } from 'axios';

export const login =
  (axiosInstance: AxiosInstance | undefined) =>
  async (username: string, password: string) => {
    if (!axiosInstance) return;
    await axiosInstance
      .post('/auth/login', { username, password })
      .catch((error) => console.log(error));
  };
