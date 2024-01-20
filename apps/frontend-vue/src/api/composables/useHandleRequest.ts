import { getAxiosInstance } from '@demo/axios-instance';
import { ref, type UnwrapRef } from 'vue';

export const useHandleRequest = <R, E>() => {
  const loading = ref(false);
  const error = ref<null | E>(null);
  const response = ref<null | R>(null);

  const updateState = (
    loadingVal: boolean,
    errorVal: null | UnwrapRef<E>,
    responseVal: null | UnwrapRef<R>
  ) => {
    loading.value = loadingVal;
    error.value = errorVal;
    response.value = responseVal;
  };

  const handleRequest = async <T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    data?: T,
    headers?: Record<string, string>,
    params?: Record<string, string>
  ): Promise<void> => {
    const axiosInstance = getAxiosInstance(import.meta.env.VITE_BASE_URL);
    updateState(true, null, null);
    axiosInstance
      .request<any, { data: UnwrapRef<R> }>({
        method,
        url,
        data,
        headers,
        params,
      })
      .then((res) => updateState(false, null, res.data))
      .catch((err) => updateState(false, err, null));
  };
  return { handleRequest, loading, error, response };
};
