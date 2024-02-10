import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import toast from "react-hot-toast";

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_GATEWAY,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error: AxiosError) => {
    console.warn(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      toast.error("unauthorized cccess");
    } else if (error?.response?.status === 403) {
      toast.error("access to the requested resource is forbidden");
    }
    return Promise.reject(error);
  }
);

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return axios.get<T>(url, config);
    },
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
      return axios.delete<T>(url, config);
    },
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.put<T>(url, body, config);
    },
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.patch<T>(url, body, config);
    },
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
      return axios.post<T>(url, body, config);
    },
  };
};

export const customApi = api(axiosInstance);

