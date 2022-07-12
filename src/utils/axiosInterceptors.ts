import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {log} from '@/utils/appLogger';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  log.info(`[request] [${JSON.stringify(config)}]`);

  if (!config.headers) {
    config.headers = {};
  }

  /*
  if (API_KEY) {
    config.params.apiKey = API_KEY;
  }
   */
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  log.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  log.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  log.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export function setupAxiosInterceptors(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
